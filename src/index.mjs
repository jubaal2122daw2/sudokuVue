/*
* Contiene los componentes de la interfaz gráfica
*/

import { router } from "./rutas.mjs";
import { copia, sudokuRandom, establecerDificultad } from "./main.mjs";

/**
 * Componentes de sudoku: CeldaComponent, TableroComponent, FilaComponent
 */

 let tiempo = 0;

 let puntuaciones = [];
 
 let almacen = {
  guardarPuntuacion: (puntuaciones) => {
    for (let i in puntuaciones) {
      localStorage.setItem(i, JSON.stringify(puntuaciones[i]));
    }
  },
  mostrar: () => {
    for (var i = 0; i < localStorage.length; i++) {
      localStorage.key(i);
      localStorage.getItem(localStorage.key(i));
      puntuaciones.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    };
  }
}
 

Vue.component('CeldaComponent', {
  props: ['celda', 'x', 'y'],
  data: function () {
    return {
      valorInput: '',
      valorCorrecto: 'neutro',
    };
  },
  watch: { //mira al v-model y aplica los cambios antes de darle valor a la variable
    valorInput: function (val) { //tiene que tener el mismo nombre que la variable en data
      let regex = new RegExp('[1-9]{1}');
      if (regex.test(val)) {
        this.valorInput = val.match(regex)[0];
        this.compararSudokus(this.valorInput);
      } else {
        this.valorInput = '';
        this.valorCorrecto = 'neutro';
      }
    }
  },
  methods: {
    compararSudokus: function (valor) {
      if (valor == sudokuRandom[this.y][this.x]) {
        this.valorCorrecto = 'acierto';
        //cambiar el valor en el array de copia
      } else {
        this.valorCorrecto = 'error';
      }
    },
    recogerPuntuacion: function () {
      for (let i = 0, j = 0; i < sudokuRandom.length && j < copia.length; i++, j++) {
        for (let k = 0, l = 0; k < sudokuRandom[i].length && l < copia[j].length; k++, l++) {
          if (sudokuRandom[i][k] == copia[j][l]) {
            console.log(sudokuRandom[i][k] + "==" + copia[j][l]);
          } else {
            console.log("es diferente");
          }
        }
      }
      console.log("==========")
    }
  },
  template: `
    <td v-bind:class="{ acierto:valorCorrecto=='acierto', error: valorCorrecto=='error', neutro: valorCorrecto=='neutro'}">
      <input type="text" maxlength="1" v-model='valorInput' v-if="celda =='vacio'" v-on:input="recogerPuntuacion()" />
      <span v-else>{{celda}}</span>
    </td>
  `
});

Vue.component('FilaComponent', {
  props: ['fila', 'y'],
  template: `
    <tr>
      <CeldaComponent v-for='index in 9' :key="index" v-bind:celda='fila[index-1]' v-bind:x='[index-1]' v-bind:y=y />
    </tr>
  `
});

Vue.component('TableroComponent', {
  data: function () {
    return {
      sudoku: copia,
    };
  },
  template: `
  <table>
      <FilaComponent v-for='index in 9' :key=index v-bind:fila='sudoku[index-1]' v-bind:y='[index-1]'/>
  </table>`
});

Vue.component('MenuSudokuComponent', {
  data: function () {
    return {
      nombre: "",
      guardado: false,
      dificultad: 0,
      tablero: false,
      interval: null,
      mostrarpuntuacion: false,
    };
  },
  methods: {
    establecerDificultad: establecerDificultad,
    registrarNombre: function () {
      this.nombre = document.getElementById("nombre").value;
      // puntuaciones.push({nombre: this.nombre, puntuacion: this.interval});
      this.guardado = true;
    },
    reload: function () {
      if (this.tablero == false) {
        window.location.reload();
      }
    },
    hacerInterval: function () {
      this.mostrarpuntuacion = false;
      if (this.interval == null) {
        this.interval = setInterval(function () {
          tiempo++;
          document.getElementById("tiempo").innerHTML = `Tiempo: ${tiempo}`;
        }, 1000);
      } else {
        this.mostrarpuntuacion = !this.mostrarpuntuacion;
        puntuaciones.push({ nombre: this.nombre, puntuacion: tiempo });
        // almacen.desar(puntuaciones);
        almacen.guardarPuntuacion(puntuaciones);
        clearInterval(this.interval);
        //console.log("PUNTUACIONES",puntuaciones);
        this.interval = null;
        tiempo = 0;

      }
    },
  },
  template: `
      <div class="flex-col grid gap-6">
        <div class="flex justify-center">
          <label>Nombre :</label>
          <input id="nombre" placeholder="   Introduce tu nombre" type="text"
            class="shadow appearance-none border rounded ml-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <button class="bg-white ml-3 py-1 px-1 hover:bg-gray-100 text-gray-800 font-semibold border border-rose-400 rounded shadow dificultad"
            v-on:click="registrarNombre">Guardar</button>
        </div>
        <p class="justify-self-center -mt-4 -mb-4" v-show="guardado==true"> Hola {{nombre}}</p>
        <div class="flex justify-center">
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-rose-400 rounded shadow dificultad"
          value="facil"
          v-on:click="establecerDificultad($event);dificultad=1;reload()">
            Fácil
          </button>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-rose-400 rounded shadow dificultad"
          value="medio"
          v-on:click="establecerDificultad($event);dificultad=2;reload()">
            Medio
          </button>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-rose-400 rounded shadow dificultad"
          value="dificil"
          v-on:click="establecerDificultad($event);dificultad=3,reload()">
            Difícil
          </button>
        </div>
        <div class="flex justify-center">
          <TableroComponent v-if="dificultad==1" class="tablero"></TableroComponent>
          <TableroComponent v-if="dificultad==2" class="tablero"></TableroComponent>
          <TableroComponent v-if="dificultad==3" class="tablero"></TableroComponent>
        </div>
        <div class="flex flex-row justify-center gap-8 items-center">
          <p class="" id="tiempo"></p>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-rose-400 rounded shadow w-48"
            v-on:click="hacerInterval()">Play/Pause Time</button>
            <p v-show="mostrarpuntuacion==true">Se ha registrado tu puntuación</p>
        </div>
      </div>
    `
});

Vue.component('PuntuacionComponent', {
  data: function () {
    return {
      puntuaciones: puntuaciones,
    };
  },
  template: `
    <table>
      <tr>
        <th>Nombre</th>
        <th>Puntuación</th>
      </tr>
      <tr v-for="(puntuacion, index) in puntuaciones">
        <td>{{ puntuacion.nombre }}</td>
        <td>{{ puntuacion.puntuacion }}</td>
      </tr>
    </table>
    `
});

let app = new Vue({
  el: '#app',
  router,
  mounted: function () {
    almacen.mostrar();
  },
});

export { app };


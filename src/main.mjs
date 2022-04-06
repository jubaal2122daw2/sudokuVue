/*
* Solo estarán el componente principal y los imports en este fichero.
* MIRAR PORQUE SOLO SE VE BIEN LA VISTA SI SE REFRESCA
*/

import { Dificultad, Sudoku } from "./clases.mjs";

let sudokuRandom = Sudoku.eleccionSudokuRandom();
let contador = Dificultad.facil.getValorDificultad(); //donde pone facil ira una variable que es la que se clicka en el menú
let copia = JSON.parse(JSON.stringify(sudokuRandom)); //la unica forma de copiar la matriz sin que copie tambien los campos.

while (true) {
  for (let i = 0; i < copia.length; i++) {
    for (let j = 0; j < copia[i].length; j++) {
      if (numerosRandom(1, 5) == 3) {
        copia[i][j] = 'vacio';
        contador--;
      }
    }
  }
  if (contador <= 0) {
    break;
  }
}

// console.table(sudokuRandom);
// console.table(copia);

function numerosRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const error = {
  data: function() {
    return {
      url: window.location.hash
    };
  },
  template: `
  <div>
    <p>URL no encaminada : {{url}} </p>
  </div>
  `
};

const comojugar = {
  template: `
    <p>Cómo jugar</p>
  `
};
const menusudoku = {
  template: `
  <div>
    <TableroComponent class="tablero"></TableroComponent>
  </div>
  `
};
const puntuacion = {
  template: `
  <h1>Puntuacion</h1>
  `
};

const rutes = {
  '': comojugar,
  '#/': comojugar,
  '#/sudoku': menusudoku,
  '#/puntuacion': puntuacion
};

Vue.component('CeldaComponent', {
  props: ['celda'],
  data: function () {
    return {
      valor: ''
    };
  },
  watch: { //mira al v-model y aplica los cambios antes de darle valor a la variable
    valor: function (val) { //tiene que tener el mismo nomnre que la variable en data
      let regex = new RegExp('[1-9]{1}');
      if (regex.test(val)) {
        this.valor = val.match(regex)[0];
      } else {
        this.valor = '';
      }
    }
  },
  template: `
    <td>
      <input type="text" maxlength="1" v-model='valor' v-if="celda =='vacio'"/>
      <span v-else>{{celda}}</span>
    </td>
  `
});

Vue.component('FilaComponent', {
  props: ['fila'],
  template: `
    <tr>
      <CeldaComponent v-for='index in 9' :key="index" v-bind:celda='fila[index-1]'/>
    </tr>
  `
});

Vue.component('TableroComponent', {
  data: function () {
    return {
      sudoku: copia
    };
  },
  template: `
  <table>
      <FilaComponent v-for='index in 9' :key=index v-bind:fila='sudoku[index-1]'/>
  </table>`
});

let app = new Vue({
  el: '#app',
  data: {
    rutaActual: window.location.hash,
    rutes: rutes
  },
  methods: {
    navegar: function ($event) {
      this.rutaActual = $event.target.hash //!= undefined ? $event.target.hash: this.rutaActual; //revisar por qué se queda bug.
      console.log(this.rutaActual)
    }
  },
  computed: {
    vistaActual: function () {
      return this.rutes[this.rutaActual] || error;
    }
  },
  template: `
  <div>
    <aside class="w-64" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
                <a href="#/" v-on:click="navegar" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                  <span class="ml-3">Cómo jugar</span>
                </a>
            </li>
            <li>
              <a href="#/sudoku" v-on:click="navegar" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                <span class="ml-3">Sudoku</span>
              </a>
            </li>
            <li>
            <a href="#/puntuacion" v-on:click="navegar" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span class="ml-3">Puntuación</span>
            </a>
            </li>
          </ul>
      </div>
    </aside>
    <div v-bind:is="vistaActual">    
    </div>

  </div>
  `
});

export {app};
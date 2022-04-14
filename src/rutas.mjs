/*
 * Rutas de la aplicación
 */
import { establecerDificultad, sudokuRandom, copia } from "./main.mjs";

const comojugar = {
  template: `
      <div class="h-full bg-rose-200 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Instrucciones de juego</h1>
        <p class="leading-relaxed">El juego consiste en completar todos los recuadros blancos mediante números del 1 al 9</p>
        <p>Cada número insertado debe ser único en su fila, columna y cuadro negro</p>
        <p>Cada vez que introduzcas un número, la casilla se iluminará de un color</p>
        <p>Si el color es rojo, ese número introducido es incorrecto. Si por el contrario se ilumina de verde, el número introducido es correcto</p>
        <a href="https://ca.wikipedia.org/wiki/Sudoku" class="text-indigo-500 inline-flex items-center mt-10">Wikipedia Sudoku</a>
      </div>
    `
};
const menusudoku = {
  data: function () {
    return {
      nombre: "",
      guardado: false,
      dificultad: 0,
      tablero: false,
      interval: null
    };
  },
  methods: {
    establecerDificultad: establecerDificultad,
    registrarNombre: function () {
      this.nombre = document.getElementById("nombre").value;
      this.guardado=true;
      console.log(this.nombre);
    },
    reload: function () {
      if (this.tablero == false) {
        window.location.reload();
      }
    },
    // console: function () {
    //   console.log(this.dificultad);
    // },
    hacerInterval: function () {
      if(this.interval == null){
        let time = 0;
        this.interval = setInterval(function () {
          time++;
          document.getElementById("tiempo").innerHTML = `Tiempo: ${time}`;
        }, 1000);
      }else{
        clearInterval(this.interval);
        this.interval = null;
      }
      console.log("interval: -> ", this.interval);
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
        </div>
      </div>
    `
};
const puntuacion = {
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
};

const routes = [
  { path: '/', component: comojugar },
  { path: '/comojugar', component: comojugar },
  { path: '/menusudoku', component: menusudoku },
  { path: '/puntuacion', component: puntuacion },
];

const router = new VueRouter({
  routes
})

export { router };
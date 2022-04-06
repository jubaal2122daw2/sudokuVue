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

/*MIRAR DE PONER LAS RUTAS EN OTRO FILE CUANDO FUNCIONEN */

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

const routes = [
  { path: '/comojugar', component: comojugar },
  { path: '/menusudoku', component: menusudoku },
  { path: '/puntuacion', component: puntuacion },
];

const router = new VueRouter({
  routes 
})

let app = new Vue({
  el: '#app',
  router
});

export {app};
//en este script se van a llamar a los componentes. Y será eñ menu lateral.

//import { Tablero } from "./clases.mjs";
//import {TableroComponent} from "./components/tablero-component.js";

let sudoku = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
]

Vue.component('FilaComponent',{
  props: ['fila'],
  template: `
    <tr>
      <td>{{fila[0]}}</td>
      <td>{{fila[1]}}</td>
      <td>{{fila[2]}}</td>
      <td>{{fila[3]}}</td>
      <td>{{fila[4]}}</td>
      <td>{{fila[5]}}</td>
      <td>{{fila[6]}}</td>
      <td>{{fila[7]}}</td>
      <td>{{fila[8]}}</td>
   </tr>
  `
});

Vue.component('TableroComponent', {
  data: function(){
    return {
      sudoku: sudoku
    };
  },
  template: `
  <table>
      <FilaComponent v-for='index in 9' v-bind:fila='sudoku[index-1]'/>
  </table>`
});

let app = new Vue({
  el: '#app',
  data: {
    prueba: 'hola'
  },
  template: `
  <div>
    <h1>{{prueba}}</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    v-on:click="generarTablero">
      Generar Tablero
    </button>
    <TableroComponent></TableroComponent>
  </div>
  `
});
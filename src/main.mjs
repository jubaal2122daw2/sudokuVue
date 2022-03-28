//en este script se van a llamar a los componentes. Y será eñ menu lateral.

//import { Tablero } from "./clases.mjs";
//import {TableroComponent} from "./components/tablero-component.js";

let sudoku = [
  [1,2,3,4,5,6,7,8,9],
  [5,6,7,8,9,1,2,3,4],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
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
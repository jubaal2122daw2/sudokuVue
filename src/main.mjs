//en este script se van a llamar a los componentes. Y será eñ menu lateral.

import { Tablero } from "./clases.mjs";
import {TableroComponent} from "./components/tablero-component.js";


let app = new Vue({
  el: '#app',
  data: {
    prueba: 'hola'
  },
  components: {
    TableroComponent
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
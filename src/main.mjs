//en este script se van a llamar a los componentes. Y será eñ menu lateral.

//import { Tablero } from "./clases.mjs";
//import {TableroComponent} from "./components/tablero-component.js";

let sudokuResuelto = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

let contador = 20;

let copia = JSON.parse(JSON.stringify(sudokuResuelto));

while (true){
  for(let i = 0; i<copia.length;i++){
    for(let j = 0; j<copia[i].length; j++){
      if(numerosRandom(1,5) == 3){
        copia[i][j] = 'vacio';
        contador--;
      }
    }
  }
  if(contador <= 0){
    break;
  }
}

console.table(sudokuResuelto);
console.table(copia);



function numerosRandom(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

//v-show="fila!='vacio'"

Vue.component('CeldaComponent',{
  //Aqui tienen que ir los inputs de solo los numeros random que no se muestran
  props: ['celda'],
  template: `
    <td>
      <input type="text" maxlength="1" pattern="[1-9]{1}" v-if="celda =='vacio'"/>
      <span v-else>{{celda}}</span>
    </td>
  `
});

Vue.component('FilaComponent',{
  props: ['fila'],
  template: `
    <tr>
      <CeldaComponent v-for='valor in fila' v-bind:celda='valor'/>
    </tr>
  `
});

Vue.component('TableroComponent', {
  data: function(){
    return {
      sudoku: copia
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
  },
  template: `
  <div>
    <TableroComponent class="tablero"></TableroComponent>
  </div>
  `
});
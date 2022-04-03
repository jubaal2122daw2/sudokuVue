import {Dificultad, Sudoku} from "./sudoku.mjs";

let sudokuRandom = Sudoku.eleccionSudokuRandom();

let contador = Dificultad.facil.getValorDificultad(); //donde pone facil ira una variable que es la que se clicka en el menú
let copia = JSON.parse(JSON.stringify(sudokuRandom));

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

console.table(sudokuRandom);
console.table(copia);

function numerosRandom(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

//

Vue.component('CeldaComponent',{
  props: ['celda'],
  data: function(){
    return {
      valor: ''
    };
  },
  watch: { //mira al v-model y aplica los cambios antes de darle valor a la variable
    valor: function (val) { //tiene que tener el mismo nomnre que la variable en data
      let regex = new RegExp('[1-9]{1}');
      if(regex.test(val)){
        this.valor = val.match(regex)[0];
      }else{
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

Vue.component('FilaComponent',{
  props: ['fila'],
  template: `
    <tr>
      <CeldaComponent v-for='index in 9' :key="index" v-bind:celda='fila[index-1]'/>
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
      <FilaComponent v-for='index in 9' :key=index v-bind:fila='sudoku[index-1]'/>
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
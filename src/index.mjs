/*
* Contiene los componentes de la interfaz gráfica
*/

import {router} from "./rutas.mjs";
import {copia, sudokuRandom} from "./main.mjs";

Vue.component('CeldaComponent', {
  props: ['celda','x','y'],
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
  methods:{
    compararSudokus: function(valor){
      if (valor == sudokuRandom[this.y][this.x]) {
        this.valorCorrecto = 'acierto';
      } else {
        this.valorCorrecto = 'error';
      }
    }
  },
  template: `
    <td v-bind:class="{ acierto:valorCorrecto=='acierto', error: valorCorrecto=='error', neutro: valorCorrecto=='neutro'}">
      <input type="text" maxlength="1" v-model='valorInput' v-if="celda =='vacio'" />
      <span v-else>{{celda}}</span>
    </td>
  `
});

Vue.component('FilaComponent', {
  props: ['fila','y'],
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

let app = new Vue({
  el: '#app',
  router
});

export {app};
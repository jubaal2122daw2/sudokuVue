/*
* Contiene los componentes de la interfaz gráfica
*/

import {router} from "./rutas.mjs";
import {copia} from "./main.mjs";

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
  router
});

export {app};
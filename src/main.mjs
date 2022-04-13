/*
* Lógica del sudoku
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

console.table(sudokuRandom);
console.table(copia);

function numerosRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export {copia, sudokuRandom};
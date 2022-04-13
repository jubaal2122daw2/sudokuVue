/*
* Lógica del sudoku
*/
import { Dificultad, Sudoku } from "./clases.mjs";

let sudokuRandom = Sudoku.eleccionSudokuRandom();
var contador = 0; //donde pone facil ira una variable que es la que se clicka en el menú
let copia = JSON.parse(JSON.stringify(sudokuRandom)); //la unica forma de copiar la matriz sin que copie tambien los campos.

function establecerDificultad(evento){
  console.log(evento.target.value)
  this.tablero = !this.tablero;
  let dif = evento.target.value;
  let facil = new Dificultad("facil", 20);
  let medio = new Dificultad("medio", 40);
  let dificil = new Dificultad("dificil", 60);
  switch(dif){
    case 'facil':
      contador = facil.getValorDificultad();
      break;
    case 'medio':
      contador = medio.getValorDificultad();
      break;
    case 'dificil':
      contador = dificil.getValorDificultad();
      break;
  }
}

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

/*crear constante indexed DB
const indexedDB = window.indexedDB

if(indexedDB){
    let db
    const request = indexedDB.open('sudoku', 1)
    request.onsuccess = () => {
        db = request.result
        console.log('Base de datos abierta', db)
    }

    request.onupgradeneeded = () => {
        db = request.result
        console.log('Base de datos creada', db)
        const objectStore = db.createObjectStore('sudokus')

    }

    request.onerror = (error) => {
        console.log('Error', error)
    } 
    
}*/

/**
 * Guarda el sudoku en lel locvalStorage
 */
let almacen = {
  guardarSudoku: () => {
    localStorage.setItem('Sudoku 1', Sudoku.sudokuResuelto1);
    localStorage.setItem('Sudoku 2', Sudoku.sudokuResuelto2);
    localStorage.setItem('Sudoku 3', Sudoku.sudokuResuelto3);
    almacen.mostrar();
  },
  mostrar: () => {
    for (var i = 0; i < localStorage.length; i++) {
      localStorage.key(i);
      localStorage.getItem(localStorage.key(i));
    };
  }
}
window.onload = function() {almacen.guardarSudoku()};

export {copia, sudokuRandom, establecerDificultad};
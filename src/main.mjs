/*
* Lógica del sudoku
*/
import { Dificultad, Sudoku } from "./clases.mjs";

let sudokuRandom = Sudoku.eleccionSudokuRandom();
let copia = '';

function establecerDificultad(evento){
  console.log(evento.target.value)
  this.tablero = !this.tablero;
  let contador = 0;
  copia = JSON.parse(JSON.stringify(sudokuRandom)); //la unica forma de copiar la matriz sin que copie tambien los campos.
  let dif = evento.target.value;
  let facil = new Dificultad("facil", 20);
  let medio = new Dificultad("medio", 40);
  let dificil = new Dificultad("dificil", 60);
  switch(dif){
    case 'facil':
      contador = facil.getValorDificultad();
      generarSudoku(contador,copia);
      break;
    case 'medio':
      contador = medio.getValorDificultad();
      generarSudoku(contador,copia);
      break;
    case 'dificil':
      contador = dificil.getValorDificultad();
      generarSudoku(contador,copia);
      break;
  }
}

function generarSudoku(contador, copia){
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
}

function numerosRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function recogerPuntuacion(sudokuRandom, copia){
  if(sudokuRandom === copia){
    console.log("es igual")
    // contarPuntuacion(tiempo);
  }else{
    console.log("es diferente");
  }
}

function contarPuntuacion(tiempo){
  //aqui la logica del indexed.
  if(tiempo <= 480){
    console.log("es bueno")
  }
  else if (tiempo > 480 && tiempo <= 960){
    console.log("es regular")
  }
  else if (tiempo > 960){
    console.log("es malo")
  }
}

console.table(sudokuRandom);

/**
 * Guarda el sudoku en el localStorage
 */
// let almacen = {
//   guardarSudoku: () => {
//     localStorage.setItem('Sudoku 1', Sudoku.sudokuResuelto1);
//     localStorage.setItem('Sudoku 2', Sudoku.sudokuResuelto2);
//     localStorage.setItem('Sudoku 3', Sudoku.sudokuResuelto3);
//     almacen.mostrar();
//   },
//   mostrar: () => {
//     for (var i = 0; i < localStorage.length; i++) {
//       localStorage.key(i);
//       localStorage.getItem(localStorage.key(i));
//     };
//   }
// }
// window.onload = function() {almacen.guardarSudoku()};

// let db;
// let almacen = {
//   guardarSudoku: function (objeto) {
//     var objectStore = db.transaction("Sudokus", "readwrite").objectStore("Sudokus");
//     objectStore.add(objeto);
//     almacen.mostrar(objectStore);
//   },
//   mostrar: function (objectStore) {
//     objectStore.onsuccess = (e) => {
//       console.log("Puntuación: " + objectStore.result.nombre);
//     }
//   }
// }

// const DB_VERSION = 5;

// if (!window.indexedDB) {
//   window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
// }

// let request = indexedDB.open("Sudoku", DB_VERSION);

// request.onerror = function (event) {
//   alert("¡Problema!");
// };

// request.onsuccess = (e) => {
//   db = e.target.result;
// }

// request.onupgradeneeded = function (event) {
//   let db = event.target.result;
//   try {
//     db.deleteObjectStore("Puntuaciones");
//   }
//   catch (e) {

//   }

//   let objectStore = db.createObjectStore("Puntuaciones", { autoIncrement: true });

//   objectStore.transaction.oncomplete = function (event) {
//     // Guarda los datos en el almacén recién creado.
//     for (let i in puntuaciones) {
//       objectStore.add(puntuaciones[i]);
//     }
//   }
// };

// window.onload = function() {almacen.guardarSudoku()};

export {copia, sudokuRandom, establecerDificultad, recogerPuntuacion};
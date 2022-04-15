/*
* Lógica del sudoku
*/
import { Dificultad, Sudoku } from "./clases.mjs";

let sudokuRandom = Sudoku.eleccionSudokuRandom();
let copia = '';

function establecerDificultad(evento) {
  console.log(evento.target.value)
  this.tablero = !this.tablero;
  let contador = 0;
  copia = JSON.parse(JSON.stringify(sudokuRandom)); //la unica forma de copiar la matriz sin que copie tambien los campos.
  let dif = evento.target.value;
  let facil = new Dificultad("facil", 20);
  let medio = new Dificultad("medio", 40);
  let dificil = new Dificultad("dificil", 60);
  switch (dif) {
    case 'facil':
      contador = facil.getValorDificultad();
      generarSudoku(contador, copia);
      break;
    case 'medio':
      contador = medio.getValorDificultad();
      generarSudoku(contador, copia);
      break;
    case 'dificil':
      contador = dificil.getValorDificultad();
      generarSudoku(contador, copia);
      break;
  }
}

function generarSudoku(contador, copia) {
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

function recogerPuntuacion(sudokuRandom, copia) {
  if (sudokuRandom === copia) {
    console.log("es igual")
    // contarPuntuacion(tiempo);
  } else {
    console.log("es diferente");
  }
}

function contarPuntuacion(tiempo) {
  //aqui la logica del indexed.
  if (tiempo <= 480) {
    console.log("es bueno")
  }
  else if (tiempo > 480 && tiempo <= 960) {
    console.log("es regular")
  }
  else if (tiempo > 960) {
    console.log("es malo")
  }
}

/**
 * IndexedDB
 */

if (!window.indexedDB) {
  alert("¡IndexedDB no es compatible!");
}

const dbconnect = window.indexedDB.open('SudokusApp', 3);
dbconnect.onupgradeneeded = ev => {
  // console.log('Actualizar BD');
  let db = ev.target.result;
  try {
    db.deleteObjectStore('Sudoku');
  }
  catch (e) {

  }

	/*const store = */db.createObjectStore('Sudoku', { /*keyPath: 'id',*/ autoIncrement: true });
  // store.createIndex('Sudoku', 'Sudoku', { unique: true });

}
dbconnect.onsuccess = ev => {
  // console.log('BD-Actualización exitosa');
  const db = ev.target.result;
  const transaction = db.transaction('Sudoku', 'readwrite');
  const store = transaction.objectStore('Sudoku');

  store.add(sudokuRandom);
    // for (const sudoku of Sudoku.sudokus) {
    //   store.add(sudoku);
    // }

  transaction.onerror = ev => {
    // console.error('¡Se ha producido un error!', ev.target.error.message);
  };

  transaction.oncomplete = ev => {
    // console.log('¡Los datos se han añadido con éxito!');
    const store = db.transaction('Sudoku', 'readonly').objectStore('Sudoku');
    const query = store.openCursor()
    query.onerror = ev => {
      console.error('¡Solicitud fallida!', ev.target.error.message);
    };
    query.onsuccess = ev => {
      const cursor = ev.target.result;
      if (cursor) {
        // console.log("FUNCIONA");
      } else {
        // console.log('¡No hay más registros disponibles!');
      }
    };
  };
};

export { copia, sudokuRandom, establecerDificultad, recogerPuntuacion };
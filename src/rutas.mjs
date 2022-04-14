/*
 * Rutas de la aplicación
 */

const comojugar = {
  template: `
      <div class="h-full bg-rose-200 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Instrucciones de juego</h1>
        <p class="leading-relaxed">El juego consiste en completar todos los recuadros blancos mediante números del 1 al 9</p>
        <p>Cada número insertado debe ser único en su fila, columna y cuadro negro</p>
        <p>Cada vez que introduzcas un número, la casilla se iluminará de un color</p>
        <p>Si el color es rojo, ese número introducido es incorrecto. Si por el contrario se ilumina de verde, el número introducido es correcto</p>
        <a href="https://ca.wikipedia.org/wiki/Sudoku" class="text-indigo-500 inline-flex items-center mt-10">Wikipedia Sudoku</a>
      </div>
    `
};
const menusudoku = {
  template: `
      <div class="flex-col grid gap-6">
        <MenuSudokuComponent></MenuSudokuComponent>
      </div>
    `
};
const puntuacion = {
  template: `
    <div>
      <PuntuacionComponent></PuntuacionComponent>
    </div>
    `
};

const routes = [
  { path: '/', component: comojugar },
  { path: '/comojugar', component: comojugar },
  { path: '/menusudoku', component: menusudoku },
  { path: '/puntuacion', component: puntuacion },
];

const router = new VueRouter({
  routes
});

export { router };

// /**
//  * INDEXED
//  */
//let db;
// let almacen = {
//   desar: function (objeto) {
//     var objectStore = db.transaction("Puntuaciones", "readwrite").objectStore("Puntuaciones");
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


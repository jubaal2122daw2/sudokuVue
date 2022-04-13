/*
 * Rutas de la aplicación
 */

const comojugar = {
    template: `
      <div>
      <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
      <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Instrucciones de juego</h1>
      <p class="leading-relaxed">El juego consiste en completar todos los recuadros blancos mediante números del 1 al 9</p>
      <p>Cada número insertado debe ser único en su fila, columna y cuadro negro</p>
            <p>Cada vez que introduzcas un número, la casilla se iluminará de un color</p>
            <p>Si el color es rojo, ese número introducido es incorrecto. Si por el contrario se ilumina de verde, el número introducido es correcto</p>
      <a class="text-indigo-500 inline-flex items-center mt-10">Wikipedia Sudoku
    
      </a>
    </div>
      </div>
    `
};
const menusudoku = {
    template: `
    <div>
      <TableroComponent class="tablero"></TableroComponent>
    </div>
    `
};
const puntuacion = {
    template: `
    <h1>Puntuacion</h1>
    `
};

const routes = [
    { path: '/comojugar', component: comojugar },
    { path: '/menusudoku', component: menusudoku },
    { path: '/puntuacion', component: puntuacion },
];

const router = new VueRouter({
    routes 
})

export {router};
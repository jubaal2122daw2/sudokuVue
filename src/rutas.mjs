/*
 * Rutas de la aplicación
 */

const comojugar = {
    template: `
      <p>Cómo jugar</p>
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
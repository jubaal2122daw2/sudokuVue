let sudokuResuelto1 = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];

let sudokuResuelto2 = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];

let sudokuResuelto3 = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];

class Dificultad{
    static facil = new Dificultad("facil", 20);
    static medio = new Dificultad("medio", 40);
    static dificil = new Dificultad("dificil", 60);

    constructor(name, valor){
        this.name = name;
        this.valor = valor;
    }

    getValorDificultad(){
        return this.valor;
    }
}

class Sudoku{

    static get sudokuResuelto1(){
        return sudokuResuelto1;
    }
    static get sudokuResuelto2(){
        return sudokuResuelto2;
    }
    static get sudokuResuelto3(){
        return sudokuResuelto3;
    }

    static sudokus = [sudokuResuelto1,sudokuResuelto2,sudokuResuelto3];
    

    static eleccionSudokuRandom() {
        let eleccion = Math.floor(Math.random() * this.sudokus.length);
        console.log("eleccion random--> ",eleccion);
        return this.sudokus[eleccion];
    }
}

export {Sudoku, Dificultad};
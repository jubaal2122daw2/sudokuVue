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
    [9,6,3,1,7,4,2,5,8],
    [1,7,8,3,2,5,6,4,9],
    [2,5,4,6,8,9,7,3,1],
    [8,2,1,4,3,7,5,9,6],
    [4,9,6,8,5,2,3,1,7],
    [7,3,5,9,6,1,8,2,4],
    [5,8,9,7,1,3,4,6,2],
    [3,1,7,2,4,6,9,8,5],
    [6,4,2,5,9,8,1,7,3]
];

let sudokuResuelto3 = [
    [1,3,6,4,9,2,5,8,7],
    [5,9,4,7,6,8,1,3,2],
    [7,2,8,3,1,5,9,6,4],
    [8,6,1,5,7,4,2,9,3],
    [2,7,5,9,3,1,6,4,8],
    [3,4,9,2,8,6,7,1,5],
    [6,5,7,1,4,3,8,2,9],
    [4,8,2,6,5,9,3,7,1],
    [9,1,3,8,2,7,4,5,6]
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
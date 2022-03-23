///clase de dificultades

class Dificultad{
    static facil = new Dificultad("facil");
    static medio = new Dificultad("medio");
    static dificil = new Dificultad("dificil");

    constructor(name, valor){
        this.name = name;
        this.valor = valor;
    }

    getName(){
        return this.name;
    }
}

//clase sudoku

class Tablero{

    dificultad = Dificultad;

    constructor(dificultad){
        this.dificultad = dificultad;
        this.tablero = [];
        this.generarTablero();
    }

    generarTablero(){
        for(let i=0;i<9;i++){
            this.tablero[i] = [];
            for(let j=0;j<9;j++){
                this.tablero[i][j] = new Celda(i,j);
            }
        }
    }

    getCelda(i,j){
        return this.tablero[i][j];
    }

    getDificultad(){
        return this.dificultad;
    }

    imprimirTablero(){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                console.log(this.tablero[i][j].getValor());
            }
        }
    }
}

export {Dificultad, Tablero};

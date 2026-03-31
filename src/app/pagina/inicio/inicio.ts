import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  ganador = ""
  tablero : any = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]

  comenzar : string = "X"
  Digitalizar(fila : number, columna : number){
    if (!this.ganador) {
      if (!(this.tablero[fila][columna] == "X" || this.tablero[fila][columna] == "O") ) {
        this.tablero[fila][columna] = this.comenzar
        this.comenzar = this.comenzar == 'X' ? "O" : "X"
        this.comprobar()
      }
    }
  }

  reiniciar(){
    this.ganador = ""
    this.tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  }
  comprobar(){
    if (this.tablero[0][0] != "") {
      
      //Diagonal izquierda Arriba Hacia Abajo Derecha y viceversa
      if ((this.tablero[0][0] == this.tablero[1][1]) && ( this.tablero[1][1] == this.tablero[2][2])) { this.ganador = this.tablero[0][0] }
      
      //Horizontal Primera Fila
      if ((this.tablero[0][0] == this.tablero[0][1]) && ( this.tablero[0][1] == this.tablero[0][2])) { this.ganador = this.tablero[0][0] }
      
      //Vertical Primera Columna
      if ((this.tablero[0][0] == this.tablero[1][0]) && ( this.tablero[1][0] == this.tablero[2][0])) { this.ganador = this.tablero[0][0] }
    }
    
    //Horizontal Segunda Fila
    if (this.tablero[1][0] != "" && (this.tablero[1][0] == this.tablero[1][1]) && ( this.tablero[1][1] == this.tablero[1][2])) { this.ganador = this.tablero[1][0] }

    //Diagonal Derecha Arriba Hacia Izquierda Abajo y viceversa
    if (this.tablero[0][2] != "" && (this.tablero[0][2] == this.tablero[1][1]) && ( this.tablero[1][1] == this.tablero[2][0])) { this.ganador = this.tablero[0][2] }

    //Horizontal Tercera Fila
    if (this.tablero[2][0] != "" && (this.tablero[2][0] == this.tablero[2][1]) && ( this.tablero[2][1] == this.tablero[2][2])) { this.ganador = this.tablero[2][0] }

    //Vertical Segunda Columna
    if (this.tablero[0][1] != "" && (this.tablero[0][1] == this.tablero[1][1]) && ( this.tablero[1][1] == this.tablero[2][1])) { this.ganador = this.tablero[0][1] }

    //Vertical Tercera Columna
    if (this.tablero[0][2] != "" && (this.tablero[0][2] == this.tablero[1][2]) && ( this.tablero[1][2] == this.tablero[2][2])) { this.ganador = this.tablero[0][2] }
    if (!this.ganador) {
      let reiniciar = true
      for (let fila = 0; fila < this.tablero.length; fila++) {
        for (let columna = 0; columna < this.tablero[fila].length; columna++) {
          if (this.tablero[fila][columna] == "") {reiniciar = false}
        }
      }
      reiniciar ? this.reiniciar() : ""
    }
  }
}

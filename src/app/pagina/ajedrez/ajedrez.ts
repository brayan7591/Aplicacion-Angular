import { Component } from '@angular/core';

@Component({
  selector: 'app-ajedrez',
  imports: [],
  templateUrl: './ajedrez.html',
  styleUrl: './ajedrez.css',
})
export class Ajedrez {
  fichasEnTablero = {}
  tablero : any[][] = []
  movimientos : string[] = []
  fichaSeleccionada : any = {}
  jugadorActual = 'primer-jugador'
  
  constructor(){

    this.crearTablero();
    
    this.agregarFichas(0,0,"Torre", "primer-jugador");
    this.agregarFichas(0,1,"Caballo", "primer-jugador");
    this.agregarFichas(0,2,"Alfil", "primer-jugador");
    this.agregarFichas(0,3,"Reyna", "primer-jugador");
    this.agregarFichas(0,4,"Rey", "primer-jugador");
    this.agregarFichas(0,5,"Alfil", "primer-jugador");
    this.agregarFichas(0,6,"Caballo", "primer-jugador");
    this.agregarFichas(0,7,"Torre", "primer-jugador");

    this.agregarFichas(1,0,"Peon", "primer-jugador");
    this.agregarFichas(1,1,"Peon", "primer-jugador");
    this.agregarFichas(1,2,"Peon", "primer-jugador");
    this.agregarFichas(1,3,"Peon", "primer-jugador");
    this.agregarFichas(1,4,"Peon", "primer-jugador");
    this.agregarFichas(1,5,"Peon", "primer-jugador");
    this.agregarFichas(1,6,"Peon", "primer-jugador");
    this.agregarFichas(1,7,"Peon", "primer-jugador");


    this.agregarFichas(7,0,"Torre", "segundo-jugador");
    this.agregarFichas(7,1,"Caballo", "segundo-jugador");
    this.agregarFichas(7,2,"Alfil", "segundo-jugador");
    this.agregarFichas(7,3,"Rey", "segundo-jugador");
    this.agregarFichas(7,4,"Reyna", "segundo-jugador");
    this.agregarFichas(7,5,"Alfil", "segundo-jugador");
    this.agregarFichas(7,6,"Caballo", "segundo-jugador");
    this.agregarFichas(7,7,"Torre", "segundo-jugador");

    this.agregarFichas(6,0,"Peon", "segundo-jugador");
    this.agregarFichas(6,1,"Peon", "segundo-jugador");
    this.agregarFichas(6,2,"Peon", "segundo-jugador");
    this.agregarFichas(6,3,"Peon", "segundo-jugador");
    this.agregarFichas(6,4,"Peon", "segundo-jugador");
    this.agregarFichas(6,5,"Peon", "segundo-jugador");
    this.agregarFichas(6,6,"Peon", "segundo-jugador");
    this.agregarFichas(6,7,"Peon", "segundo-jugador");
  }

  posiblesMovimientos(fila : number, columna : number, ficha? : string, jugador? : string){
    let movimientos : string[] = []
    if (jugador == this.jugadorActual) {
      switch (ficha) {
        case "Torre":
          let movimientosHaciaArriba : string[] | any = []
          let movimientosHaciaAbajo : string[] | any = []
          let movimientosHaciaIzquierda : string[] | any = []
          let movimientosHaciaDerecha : string[] | any = []

          let arriba : boolean = fila == 0 ? false : true
          let abajo : boolean = fila == 7 ? false : true
          let izquierda : boolean = columna == 0 ? false : true
          let derecha : boolean = columna == 7 ? false : true

          for (let index = 1; index <= 7; index++) {
            if (arriba) {
              if (this.tablero[+fila-index][+columna].Ficha) {
                if (this.tablero[+fila-index][+columna].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaArriba.push({columna: +columna, fila: +fila-index })
                }
                arriba = false;
              } else {
                movimientosHaciaArriba.push({columna: +columna, fila: +fila-index })
                arriba = +fila-index == 0 ? false : true
              }
            }
            if (abajo) {
              if (this.tablero[+fila+index][+columna].Ficha) {
                if (this.tablero[+fila+index][+columna].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaAbajo.push({columna: +columna, fila: +fila+index })
                }
                abajo = false; 
              } else {
                movimientosHaciaAbajo.push({columna: +columna, fila: +fila+index })
                abajo = +fila+index == 7 ? false : true
              }
            }
            if (derecha) {
              if (this.tablero[+fila][+columna+index].Ficha) {
                if (this.tablero[+fila][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaDerecha.push({columna: +columna+index, fila: +fila })
                }
                derecha = false
              }else{
                movimientosHaciaDerecha.push({columna: +columna+index, fila: +fila })
                derecha = +columna+index == 7 ? false : true
              }
            }

            if (izquierda) {
              if (this.tablero[+fila][+columna-index].Ficha) {
                if (this.tablero[+fila][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaIzquierda.push({columna: +columna-index, fila: +fila })
                }
                izquierda = false
              }else{
                movimientosHaciaIzquierda.push({columna: +columna-index, fila: +fila })
                izquierda = +columna-index == 0 ? false : true
              }
            }
          }

          movimientos = [
            ...movimientosHaciaArriba,
            ...movimientosHaciaAbajo,
            ...movimientosHaciaDerecha, 
            ...movimientosHaciaIzquierda
          ]

          break;
        
        case "Peon" :
          let movimientoHaciaDelante : string | any = []
          let numeroDireccion : number
          let numeroCondicional : number
          if (jugador == "primer-jugador") {
            numeroDireccion = 1
            numeroCondicional = 1
          }else{
            numeroDireccion = -1
            numeroCondicional = 6
          }

          if (fila == numeroCondicional) {
            for (let index = 1; index <= 2; index++) {
              let numero = index*numeroDireccion
              if (!this.tablero[+fila+numero][+columna].Ficha) { movimientoHaciaDelante.push({columna: +columna, fila: +fila+numero}) } else { break }
            }
          }else{
            if (!this.tablero[+fila+numeroDireccion][+columna].Ficha) { movimientoHaciaDelante.push({columna: +columna, fila: +fila+numeroDireccion}) }
          }

          if (columna < 7 && this.tablero[+fila+numeroDireccion][+columna+1].Ficha && this.tablero[+fila+numeroDireccion][+columna+1].Jugador != this.jugadorActual) { movimientoHaciaDelante.push({columna: +columna+1, fila: +fila+numeroDireccion}) }
          if (columna > 0 && this.tablero[+fila+numeroDireccion][+columna-1].Ficha && this.tablero[+fila+numeroDireccion][+columna-1].Jugador != this.jugadorActual) { movimientoHaciaDelante.push({columna: +columna-1, fila: +fila+numeroDireccion}) }
          
          movimientos = [ ...movimientoHaciaDelante]

          break
        
        case "Reyna":

          let diagonalArribaIzquierdaReyna : string[] | any = []
          let diagonalArribaDerechaReyna : string[] | any = []
          let diagonalAbajoIzquierdaReyna : string[] | any = []
          let diagonalAbajoDerechaReyna : string[] | any = []

          let movimientosHaciaArribaReyna : string[] | any = []
          let movimientosHaciaAbajoReyna : string[] | any = []
          let movimientosHaciaIzquierdaReyna : string[] | any = []
          let movimientosHaciaDerechaReyna : string[] | any = []

          let arribaReyna : boolean = fila == 0 ? false : true
          let abajoReyna : boolean = fila == 7 ? false : true
          let izquierdaReyna : boolean = columna == 0 ? false : true
          let derechaReyna : boolean = columna == 7 ? false : true

          let arribaIzquierdaReyna : boolean = fila == 0 || columna == 0 ? false : true
          let arribaDerechaReyna : boolean = fila == 0 || columna == 7 ? false : true
          let abajoIzquierdaReyna : boolean = fila == 7 || columna == 0 ? false : true
          let abajoDerechaReyna : boolean = fila == 7 || columna == 7 ? false : true

          for (let index = 1; index <= 7; index++) {
            if (arribaReyna) {
              if (this.tablero[+fila-index][+columna].Ficha) {
                if (this.tablero[+fila-index][+columna].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaArribaReyna.push({columna: +columna, fila: +fila-index })
                }
                arribaReyna = false;
              } else {
                movimientosHaciaArribaReyna.push({columna: +columna, fila: +fila-index })
                arribaReyna = +fila-index == 0 ? false : true
              }
            }
            if (abajoReyna) {
              if (this.tablero[+fila+index][+columna].Ficha) {
                if (this.tablero[+fila+index][+columna].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaAbajoReyna.push({columna: +columna, fila: +fila+index })
                }
                abajoReyna = false; 
              } else {
                movimientosHaciaAbajoReyna.push({columna: +columna, fila: +fila+index })
                abajoReyna = +fila+index == 7 ? false : true
              }
            }
            if (derechaReyna) {
              if (this.tablero[+fila][+columna+index].Ficha) {
                if (this.tablero[+fila][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaDerechaReyna.push({columna: +columna+index, fila: +fila })
                }
                derechaReyna = false
              }else{
                movimientosHaciaDerechaReyna.push({columna: +columna+index, fila: +fila })
                derechaReyna = +columna+index == 7 ? false : true
              }
            }

            if (izquierdaReyna) {
              if (this.tablero[+fila][+columna-index].Ficha) {
                if (this.tablero[+fila][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  movimientosHaciaIzquierdaReyna.push({columna: +columna-index, fila: +fila })
                }
                izquierdaReyna = false
              }else{
                movimientosHaciaIzquierdaReyna.push({columna: +columna-index, fila: +fila })
                izquierdaReyna = +columna-index == 0 ? false : true
              }
            }
            if (arribaIzquierdaReyna) {
              if (this.tablero[+fila-index][+columna-index].Ficha) {
                if (this.tablero[+fila-index][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalArribaIzquierdaReyna.push({columna: +columna-index, fila: +fila-index })
                }
                arribaIzquierdaReyna = false;
              } else {
                diagonalArribaIzquierdaReyna.push({columna: +columna-index, fila: +fila-index })
                arribaIzquierdaReyna = +fila-index == 0 || +columna-index == 0 ? false : true
              }
            }
            if (arribaDerechaReyna) {
              if (this.tablero[+fila-index][+columna+index].Ficha) {
                if (this.tablero[+fila-index][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalArribaDerechaReyna.push({columna: +columna+index, fila: +fila-index })
                }
                arribaDerechaReyna = false; 
              } else {
                diagonalArribaDerechaReyna.push({columna: +columna+index, fila: +fila-index })
                arribaDerechaReyna = +fila-index == 0 || +columna+index == 7 ? false : true
              }
            }
            if (abajoIzquierdaReyna) {
              if (this.tablero[+fila+index][+columna-index].Ficha) {
                if (this.tablero[+fila+index][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalAbajoIzquierdaReyna.push({columna: +columna-index, fila: +fila+index })
                }
                abajoIzquierdaReyna = false
              }else{
                diagonalAbajoIzquierdaReyna.push({columna: +columna-index, fila: +fila+index })
                abajoIzquierdaReyna = +columna-index == 0 || +fila+index == 7 ? false : true
              }
            }

            if (abajoDerechaReyna) {
              if (this.tablero[+fila+index][+columna+index].Ficha) {
                if (this.tablero[+fila+index][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalAbajoDerechaReyna.push({columna: +columna+index, fila: +fila+index })
                }
                abajoDerechaReyna = false
              }else{
                diagonalAbajoDerechaReyna.push({columna: +columna+index, fila: +fila+index })
                abajoDerechaReyna = +columna+index == 7 || +fila+index == 7 ? false : true
              }
            }
          }

          movimientos = [
            ...movimientosHaciaArribaReyna,
            ...movimientosHaciaAbajoReyna,
            ...movimientosHaciaDerechaReyna, 
            ...movimientosHaciaIzquierdaReyna,
            ...diagonalArribaDerechaReyna,
            ...diagonalArribaIzquierdaReyna,
            ...diagonalAbajoDerechaReyna, 
            ...diagonalAbajoIzquierdaReyna
          ]

          break;

        case "Rey":
          let movimientoEnCuadrado : string | any = []

          columna == 0 || fila == 0 || this.tablero[fila-1][columna-1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna-1, fila: fila-1})
          columna == 7 || fila == 0 || this.tablero[fila-1][columna+1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna+1, fila: fila-1})
          columna == 0 || fila == 7 || this.tablero[fila+1][columna-1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna-1, fila: fila+1})
          columna == 7 || fila == 7 || this.tablero[fila+1][columna+1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna+1, fila: fila+1})
          
          fila == 0 || this.tablero[fila-1][columna].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna, fila: fila-1})
          fila == 7 || this.tablero[fila+1][columna].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna, fila: fila+1})
          columna == 0 || this.tablero[fila][columna-1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna-1, fila: fila})
          columna == 7 || this.tablero[fila][columna+1].Jugador == this.tablero[fila][columna].Jugador ? '' : movimientoEnCuadrado.push({columna: columna+1, fila: fila})
          movimientos = [ ...movimientoEnCuadrado]
          break
        
        case "Caballo":
          let movimientoEnL : string | any = []

          fila >= 2 && columna >= 1 && this.tablero[fila-2][columna-1].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna-1, fila: +fila-2})   : ''
          fila >= 1 && columna >= 2 && this.tablero[fila-1][columna-2].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna-2, fila: +fila-1})   : ''
          fila >= 2 && columna <= 6 && this.tablero[fila-2][columna+1].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna+1, fila: +fila-2})   : ''
          fila >= 1 && columna <= 5 && this.tablero[fila-1][columna+2].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna+2, fila: +fila-1})   : ''

          fila <= 6 && columna >= 2 && this.tablero[fila+1][columna-2].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna-2, fila: +fila+1})   : ''
          fila <= 5 && columna >= 1 && this.tablero[fila+2][columna-1].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna-1, fila: +fila+2})   : ''
          fila <= 6 && columna <= 5 && this.tablero[fila+1][columna+2].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna+2, fila: +fila+1})   : ''
          fila <= 5 && columna <= 6 && this.tablero[fila+2][columna+1].Jugador != this.tablero[fila][columna].Jugador ?  movimientoEnL.push({columna: +columna+1, fila: +fila+2})   : ''

          movimientos = [ ...movimientoEnL]
          break
        
        case "Alfil":
          let diagonalArribaIzquierda : string[] | any = []
          let diagonalArribaDerecha : string[] | any = []
          let diagonalAbajoIzquierda : string[] | any = []
          let diagonalAbajoDerecha : string[] | any = []

          let arribaIzquierda : boolean = fila == 0 || columna == 0 ? false : true
          let arribaDerecha : boolean = fila == 0 || columna == 7 ? false : true
          let abajoIzquierda : boolean = fila == 7 || columna == 0 ? false : true
          let abajoDerecha : boolean = fila == 7 || columna == 7 ? false : true

          for (let index = 1; index <= 7; index++) {
            if (arribaIzquierda) {
              if (this.tablero[+fila-index][+columna-index].Ficha) {
                if (this.tablero[+fila-index][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalArribaIzquierda.push({columna: +columna-index, fila: +fila-index })
                }
                arribaIzquierda = false;
              } else {
                diagonalArribaIzquierda.push({columna: +columna-index, fila: +fila-index })
                arribaIzquierda = +fila-index == 0 || +columna-index == 0 ? false : true
              }
            }
            if (arribaDerecha) {
              if (this.tablero[+fila-index][+columna+index].Ficha) {
                if (this.tablero[+fila-index][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalArribaDerecha.push({columna: +columna+index, fila: +fila-index })
                }
                arribaDerecha = false; 
              } else {
                diagonalArribaDerecha.push({columna: +columna+index, fila: +fila-index })
                arribaDerecha = +fila-index == 0 || +columna+index == 7 ? false : true
              }
            }
            if (abajoIzquierda) {
              if (this.tablero[+fila+index][+columna-index].Ficha) {
                if (this.tablero[+fila+index][+columna-index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalAbajoIzquierda.push({columna: +columna-index, fila: +fila+index })
                }
                abajoIzquierda = false
              }else{
                diagonalAbajoIzquierda.push({columna: +columna-index, fila: +fila+index })
                abajoIzquierda = +columna-index == 0 || +fila+index == 7 ? false : true
              }
            }

            if (abajoDerecha) {
              if (this.tablero[+fila+index][+columna+index].Ficha) {
                if (this.tablero[+fila+index][+columna+index].Jugador != this.tablero[+fila][+columna].Jugador) {
                  diagonalAbajoDerecha.push({columna: +columna+index, fila: +fila+index })
                }
                abajoDerecha = false
              }else{
                diagonalAbajoDerecha.push({columna: +columna+index, fila: +fila+index })
                abajoDerecha = +columna+index == 7 || +fila+index == 7 ? false : true
              }
            }
          }

          movimientos = [
            ...diagonalArribaDerecha,
            ...diagonalArribaIzquierda,
            ...diagonalAbajoDerecha, 
            ...diagonalAbajoIzquierda
          ]

          break
        default:
          if (this.movimientos) {
            this.movimientos.forEach((elemento : any) => {
              delete this.tablero[elemento.fila][elemento.columna].Activo
            });
          }
          break;
      }
    }
    
    if (this.movimientos) {
      this.movimientos.forEach((elemento : any) => {
        delete this.tablero[elemento.fila][elemento.columna].Activo
        if (elemento.fila == fila && elemento.columna == columna) {
          this.tablero[fila][columna] = {...this.tablero[fila][columna], Ficha : this.fichaSeleccionada.nombre, Jugador : this.fichaSeleccionada.jugador}
          delete this.tablero[this.fichaSeleccionada.fila][this.fichaSeleccionada.columna].Ficha
          delete this.tablero[this.fichaSeleccionada.fila][this.fichaSeleccionada.columna].Jugador
          movimientos = []
          ficha = ""
          this.jugadorActual = this.jugadorActual  == "primer-jugador" ? "segundo-jugador" : "primer-jugador"
        }
      });
    }

    movimientos.forEach((elemento : any) => {
      this.tablero[elemento.fila][elemento.columna] = {...this.tablero[elemento.fila][elemento.columna], Activo : true}
    });
    this.movimientos = movimientos
    if (ficha) {
      this.fichaSeleccionada = {
        fila: fila,
        columna: columna,
        nombre: ficha,
        jugador: jugador
      }
    }else{
      this.fichaSeleccionada = {}
    }
  }

  agregarFichas(fila : number, columna : number, ficha : string, jugador : string){
    this.tablero[fila][columna] = {...this.tablero[fila][columna], Ficha : ficha, Jugador : jugador}
  }

  crearTablero(){
    for (let filas = 0; filas < 8; filas++) {
      let columnasArray = []
      let columnasObjeto = {}
      for (let columnas = 0; columnas < 8; columnas++) {
        columnasObjeto = (columnas+filas) % 2 == 0 ? { colorTablero : "blanco"} : { colorTablero : "negro"}
        columnasArray.push(columnasObjeto)
      }
      this.tablero.push(columnasArray)
    }
  }
}

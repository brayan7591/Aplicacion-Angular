import { Component } from '@angular/core';

@Component({
  selector: 'app-ajedrez-segundo',
  imports: [],
  templateUrl: './ajedrez-segundo.html',
  styleUrl: './ajedrez-segundo.css',
})
export class AjedrezSegundo {

  //Variable para posibles enroques al comienzo del juego
  movimientosEnroque : any = []

  //Variable para obtener la posicion y si esta en hacke el rey blanco
  reyBlanco : any = {}

  //Variable para obtener la posicion y si esta en hacke el rey negro
  reyNegro : any = {}

  //Variable para posibles fichas que esten bloqueadas al comienzo del juego (es decir si se mueven dan hacke directo al rey)
  fichasBloqueadas : any = []

  //Variable para saber en que posicion una ficha esta realizando hacke al rey
  fichaHackeMate : any = {}

  //Variable para especificar el ganador cuando se termine la partida
  ganador : string = ""

  //Variable que permite identificar los movimientos de las fichas blancas, es utilizada para que al momento de mover al rey negro no pueda ir donde se puede hacer hackeMate
  todosMovimientosFichasBlancas : any = []

  //Variable que permite identificar los movimientos de las fichas negras, es utilizada para que al momento de mover al rey blanco no pueda ir donde se puede hacer hackeMate
  todosMovimientosFichasNegras : any = []

  //Variable que es utilizada para especificar cual es la ficha seleccionada al momento de clickearlas en el tablero
  fichaSeleccionada : any = {}

  //Muestra los movimientos disponibles al momento de clickear una ficha del ajedrez
  movimientosDisponibles : any = []

  //Comprueba se el juego continua o ya se termino
  gameOver : boolean = false

  //Muestra la posicion de todas las fichas actualmente en el tablero
  fichasActuales : any[] = []

  //Especifica cuantas columnas y filas va a tener el tablero
  tablero : any = []

  //Permite especificar el primer turno del juego (primer-jugador o segundo-jugador)
  jugadorActual : string = 'primer-jugador'

  constructor(){
    
    // Señalando los campos que van a tener las fichas
    interface fichas{
      fila: number,
      columna: number,
      ficha: string,
      jugador: string,
    }

    // Especificando las fichas que van a estar al principio
    const fichasIniciales : fichas[] = [

      {fila: 0, columna: 0, ficha: "Torre", jugador: "primer-jugador"},
      {fila: 0, columna: 1, ficha: "Caballo", jugador: "primer-jugador"},
      {fila: 0, columna: 2, ficha: "Alfil", jugador: "primer-jugador"},
      {fila: 0, columna: 3, ficha: "Reyna", jugador: "primer-jugador"},
      {fila: 0, columna: 4, ficha: "Rey", jugador: "primer-jugador"},
      {fila: 0, columna: 5, ficha: "Alfil", jugador: "primer-jugador"},
      {fila: 0, columna: 6, ficha: "Caballo", jugador: "primer-jugador"},
      {fila: 0, columna: 7, ficha: "Torre", jugador: "primer-jugador"},

      {fila: 1, columna: 0, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 1, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 2, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 3, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 4, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 5, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 6, ficha: "Peon", jugador: "primer-jugador"},
      {fila: 1, columna: 7, ficha: "Peon", jugador: "primer-jugador"},

      {fila: 6, columna: 0, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 1, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 2, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 3, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 4, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 5, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 6, ficha: "Peon", jugador: "segundo-jugador"},
      {fila: 6, columna: 7, ficha: "Peon", jugador: "segundo-jugador"},

      {fila: 7, columna: 0, ficha: "Torre", jugador: "segundo-jugador"},
      {fila: 7, columna: 1, ficha: "Caballo", jugador: "segundo-jugador"},
      {fila: 7, columna: 2, ficha: "Alfil", jugador: "segundo-jugador"},
      {fila: 7, columna: 3, ficha: "Rey", jugador: "segundo-jugador"},
      {fila: 7, columna: 4, ficha: "Reyna", jugador: "segundo-jugador"},
      {fila: 7, columna: 5, ficha: "Alfil", jugador: "segundo-jugador"},
      {fila: 7, columna: 6, ficha: "Caballo", jugador: "segundo-jugador"},
      {fila: 7, columna: 7, ficha: "Torre", jugador: "segundo-jugador"},


    ]
    
    // Creando el Tablero
    for (let filas = 0; filas < 8; filas++) {
      let columnasArray = []
      let columnasObjeto = {}
      for (let columnas = 0; columnas < 8; columnas++) {
        columnasObjeto = (columnas+filas) % 2 == 0 ? { colorTablero : "blanco"} : { colorTablero : "negro"}
        columnasArray.push(columnasObjeto)
      }
      this.tablero.push(columnasArray)
    }

    // Colocando las fichas iniciales en el tablero
    fichasIniciales.forEach((fichaActual)=>{
      // Verificando si en la posicion ya hay una ficha para no sobreescribirla
      if (!this.tablero[fichaActual.fila][fichaActual.columna].Ficha) {

        //Colocando la ficha en el tablero 
        this.tablero[fichaActual.fila][fichaActual.columna] = {
          ...this.tablero[fichaActual.fila][fichaActual.columna],
          Ficha : fichaActual.ficha,
          Jugador : fichaActual.jugador,
        }

        //Especificando que si la ficha es un peon, al comienzo puede dar 2 movimientos hacia delante
        if (this.tablero[fichaActual.fila][fichaActual.columna].Ficha == "Peon") {
          this.tablero[fichaActual.fila][fichaActual.columna] = {
            ...this.tablero[fichaActual.fila][fichaActual.columna],
            primerMovimiento : fichaActual.fila,
          }
        }

        //Especificando que las fichas de torre pueden hacer un enroque
        if (this.tablero[fichaActual.fila][fichaActual.columna].Ficha == "Torre") {
          this.tablero[fichaActual.fila][fichaActual.columna] = {
            ...this.tablero[fichaActual.fila][fichaActual.columna],
            Enroque : true,
          }
        }

        //Especificando que el rey tambien pueden hacer un enroque
        if (this.tablero[fichaActual.fila][fichaActual.columna].Ficha == "Rey") {
          this.tablero[fichaActual.fila][fichaActual.columna] = {
            ...this.tablero[fichaActual.fila][fichaActual.columna],
            Enroque : true,
          }
        }
        //Obteniendo la ubicacion de todas las fichas en el tablero
        this.fichasActuales = [...this.fichasActuales, {posicionX: fichaActual.columna, posicionY: fichaActual.fila }]
        
      }else{
        console.error("Ya hay una ficha en la posicion: " + fichaActual.fila + ", " + fichaActual.columna)
      }
      
    })

    // Verificar estado del juego y los movimientos de las fichas
    this.verificar()
  }

  //Funcion para comprobar si, la ficha clickeada es del jugador actual, ademas de si el juego esta terminado y si las fichas tienen posibilidad de moverse
  comprobar(jugador : string, fila: number, columna: number){
    return jugador == this.jugadorActual && this.gameOver == false && this.tablero[fila][columna].Movimientos.length > 0
  }

  //Funcion que es llamada desde la vista (Html) para obtener la posicion de donde se esta haciendo click y el jugador de aquella ficha
  posiblesMovimientos(jugador: string, fila : number, columna : number){
    if (this.gameOver) { console.log("El juego esta terminado"); return }
    if (this.tablero[fila][columna].Activo) { this.moverPieza(fila, columna); return } else { this.limpiarTablero() }
    if (!this.comprobar(jugador, fila, columna)) {return}

    this.fichaSeleccionada = {fila: fila, columna: columna}
    this.tablero[fila][columna].Movimientos.forEach((posicionesMovimientos : any)=>{
      this.tablero[posicionesMovimientos.fila][posicionesMovimientos.columna] = {...this.tablero[posicionesMovimientos.fila][posicionesMovimientos.columna], Activo: true}
      this.movimientosDisponibles.push({fila: posicionesMovimientos.fila, columna: posicionesMovimientos.columna})
    })
  }

  //Funcion utilizada para poder mover la pieza ya seleccionada a una nueva posicion
  moverPieza(fila: number, columna: number){

    let ficha = this.fichaSeleccionada
    let nuevaFicha = this.tablero[ficha.fila][ficha.columna].Ficha

    if (this.tablero[fila][columna].Ficha) {
      const indice = this.fichasActuales.findIndex(p => p.posicionX === columna && p.posicionY === fila);
      if (indice !== -1) { this.fichasActuales.splice(indice, 1) }
    }

    if (this.tablero[ficha.fila][ficha.columna].Ficha == "Peon" && (fila == 0 || fila == 7)) {
      const opciones = ["Caballo", "Reyna", "Torre", "Alfil"]
      do {
        nuevaFicha = prompt("Escribe la nueva ficha (Caballo, Reyna, Alfil, Torre)")
        nuevaFicha = nuevaFicha.charAt(0).toUpperCase() + nuevaFicha.slice(1).toLowerCase();
      } while (!opciones.includes(nuevaFicha));
    }
    
    if (this.tablero[ficha.fila][ficha.columna].Ficha == "Rey" && this.tablero[ficha.fila][ficha.columna].Enroque) {
      this.movimientosEnroque.forEach((movimiento : any) => {
        if (fila == movimiento.fila && columna == movimiento.columna) {
          this.tablero[movimiento.torre.movimiento.fila][movimiento.torre.movimiento.columna] = {
            ...this.tablero[movimiento.torre.movimiento.fila][movimiento.torre.movimiento.columna],
            Ficha : "Torre",
            Jugador : this.tablero[movimiento.torre.fila][movimiento.torre.columna].Jugador
          }
          delete this.tablero[movimiento.torre.fila][movimiento.torre.columna].Ficha
          delete this.tablero[movimiento.torre.fila][movimiento.torre.columna].Jugador
          delete this.tablero[movimiento.torre.fila][movimiento.torre.columna].Movimimientos
          delete this.tablero[movimiento.torre.fila][movimiento.torre.columna].Enroque
          const indice = this.fichasActuales.findIndex(p => p.posicionX === movimiento.torre.columna && p.posicionY === movimiento.torre.fila);
          if (indice !== -1) { this.fichasActuales.splice(indice, 1) }
          this.fichasActuales = [...this.fichasActuales, {posicionX: movimiento.torre.movimiento.columna, posicionY: movimiento.torre.movimiento.fila }]
        }
      });
    }
    
    this.tablero[fila][columna] = {
      ...this.tablero[fila][columna],
      Ficha : nuevaFicha,
      Jugador : this.tablero[ficha.fila][ficha.columna].Jugador
    }

    delete this.tablero[ficha.fila][ficha.columna].Ficha
    delete this.tablero[ficha.fila][ficha.columna].Jugador
    delete this.tablero[ficha.fila][ficha.columna].primerMovimiento
    delete this.tablero[ficha.fila][ficha.columna].Movimimientos
    delete this.tablero[ficha.fila][ficha.columna].hackeMate
    delete this.tablero[ficha.fila][ficha.columna].Enroque
    
    const indice = this.fichasActuales.findIndex(p => p.posicionX === ficha.columna && p.posicionY === ficha.fila);
    if (indice !== -1) { this.fichasActuales.splice(indice, 1) }

    this.fichasActuales = [...this.fichasActuales, {posicionX: columna, posicionY: fila }]
    this.jugadorActual = this.jugadorActual == "primer-jugador" ? "segundo-jugador" : "primer-jugador"
    this.limpiarTablero();
    this.verificar()
  }

  //Funcion para limpiar el tablero cuando se clickea una ficha (cuando en el tablero se muestra los movimientos de la ficha)
  limpiarTablero(){
    if (this.movimientosDisponibles) {
      this.movimientosDisponibles.forEach((movimientoDisponible : any) => {
        delete this.tablero[movimientoDisponible.fila][movimientoDisponible.columna].Activo
      });
      this.movimientosDisponibles = []
    }
    this.fichaSeleccionada = {}
  }

  //Funcion para obtener los movimientos de una determinada ficha
  obtenerMovimientos(tablero : any, posicionY : number, posicionX: number) {
    let movimientos : any = []
    switch (tablero.Ficha) {
      case "Torre":
        let movimientosHaciaAbajo : any[] = []
        let movimientosHaciaArriba : any[] = []
        let movimientosHaciaIzquierda : any[] = []
        let movimientosHaciaDerecha : any[] = []

        for (let index = 1; index < 8; index++) {
          posicionX-index >= 0 ? movimientosHaciaIzquierda.push({fila: posicionY, columna: posicionX-index}) : ''
          posicionX+index <= 7 ? movimientosHaciaDerecha.push({fila: posicionY, columna: posicionX+index}) : ''
          posicionY+index <= 7 ? movimientosHaciaAbajo.push({fila: posicionY+index, columna: posicionX}) : ''
          posicionY-index >= 0 ? movimientosHaciaArriba.push({fila: posicionY-index, columna: posicionX}) : ''
        }

        movimientos.push(movimientosHaciaIzquierda)
        movimientos.push(movimientosHaciaDerecha)
        movimientos.push(movimientosHaciaAbajo)
        movimientos.push(movimientosHaciaArriba)

        break;
     
      case "Alfil":
        let movimientosHaciaArribaIzquierda : any[] = []
        let movimientosHaciaArribaDerecha : any[] = []
        let movimientosHaciaAbajoIzquierda : any[] = []
        let movimientosHaciaAbajoDerecha : any[] = []

        for (let index = 1; index < 8; index++) {
          posicionX-index >= 0 && posicionY-index >= 0 ? movimientosHaciaArribaIzquierda.push({fila: posicionY-index, columna: posicionX-index}) : ''
          posicionX-index >= 0 && posicionY+index <= 7 ? movimientosHaciaAbajoIzquierda.push({fila: posicionY+index, columna: posicionX-index}) : ''
          posicionX+index <= 7 && posicionY-index >= 0 ? movimientosHaciaArribaDerecha.push({fila: posicionY-index, columna: posicionX+index}) : ''
          posicionX+index <= 7 && posicionY+index <= 7 ? movimientosHaciaAbajoDerecha.push({fila: posicionY+index, columna: posicionX+index}) : ''
        }
        
        movimientos.push(movimientosHaciaArribaIzquierda)
        movimientos.push(movimientosHaciaAbajoIzquierda)
        movimientos.push(movimientosHaciaArribaDerecha)
        movimientos.push(movimientosHaciaAbajoDerecha)

        break;

      case "Reyna":
        let movimientosHaciaArribaIzquierdaReyna : any[] = []
        let movimientosHaciaArribaDerechaReyna : any[] = []
        let movimientosHaciaAbajoIzquierdaReyna : any[] = []
        let movimientosHaciaAbajoDerechaReyna : any[] = []
        let movimientosHaciaAbajoReyna : any[] = []
        let movimientosHaciaArribaReyna : any[] = []
        let movimientosHaciaIzquierdaReyna : any[] = []
        let movimientosHaciaDerechaReyna : any[] = []
        
        for (let index = 1; index < 8; index++) {
          posicionX-index >= 0 && posicionY-index >= 0 ? movimientosHaciaArribaIzquierdaReyna.push({fila: posicionY-index, columna: posicionX-index}) : ''
          posicionX-index >= 0 && posicionY+index <= 7 ? movimientosHaciaAbajoIzquierdaReyna.push({fila: posicionY+index, columna: posicionX-index}) : ''
          posicionX+index <= 7 && posicionY-index >= 0 ? movimientosHaciaArribaDerechaReyna.push({fila: posicionY-index, columna: posicionX+index}) : ''
          posicionX+index <= 7 && posicionY+index <= 7 ? movimientosHaciaAbajoDerechaReyna.push({fila: posicionY+index, columna: posicionX+index}) : ''
          posicionX-index >= 0 ? movimientosHaciaIzquierdaReyna.push({fila: posicionY, columna: posicionX-index}) : ''
          posicionX+index <= 7 ? movimientosHaciaDerechaReyna.push({fila: posicionY, columna: posicionX+index}) : ''
          posicionY+index <= 7 ? movimientosHaciaAbajoReyna.push({fila: posicionY+index, columna: posicionX}) : ''
          posicionY-index >= 0 ? movimientosHaciaArribaReyna.push({fila: posicionY-index, columna: posicionX}) : ''
        }

        movimientos.push(movimientosHaciaArribaIzquierdaReyna)
        movimientos.push(movimientosHaciaAbajoIzquierdaReyna)
        movimientos.push(movimientosHaciaArribaDerechaReyna)
        movimientos.push(movimientosHaciaAbajoDerechaReyna)
        movimientos.push(movimientosHaciaIzquierdaReyna)
        movimientos.push(movimientosHaciaDerechaReyna)
        movimientos.push(movimientosHaciaAbajoReyna)
        movimientos.push(movimientosHaciaArribaReyna)

        break

      case "Peon":
        let movimientosHaciaDelante : any = []
        let movimientosHaciaDiagonal : any = []
        let numeroParaDireccion = tablero.Jugador == "primer-jugador" ? 1 : -1
        let numeroDeRepeticiones = tablero.primerMovimiento == posicionY ? 2 : 1
        for (let index = 1; index <= numeroDeRepeticiones; index++) {
          posicionY+(index*numeroParaDireccion) >= 0 && posicionY+(index*numeroParaDireccion) <= 7 ? movimientosHaciaDelante.push({fila: posicionY + (index*numeroParaDireccion), columna: posicionX}) : ''
        }
        if (posicionX > 0 && posicionY+numeroParaDireccion >= 0 && posicionY+numeroParaDireccion <= 7) { movimientosHaciaDiagonal.push({fila: +posicionY+numeroParaDireccion , columna: +posicionX-1}) }
        if (posicionX < 7 && posicionY+numeroParaDireccion >= 0 && posicionY+numeroParaDireccion <= 7) { movimientosHaciaDiagonal.push({fila: +posicionY+numeroParaDireccion , columna: +posicionX+1}) }
        
        movimientos.push(movimientosHaciaDelante);
        movimientos.push(movimientosHaciaDiagonal);
        break;
      
      case "Caballo":

        posicionY >= 2 && posicionX >= 1 ?  movimientos.push([{fila: +posicionY-2, columna: +posicionX-1}])   : ''
        posicionY >= 1 && posicionX >= 2 ?  movimientos.push([{fila: +posicionY-1, columna: +posicionX-2}])   : ''
        posicionY >= 2 && posicionX <= 6 ?  movimientos.push([{fila: +posicionY-2, columna: +posicionX+1}])   : ''
        posicionY >= 1 && posicionX <= 5 ?  movimientos.push([{fila: +posicionY-1, columna: +posicionX+2}])   : ''

        posicionY <= 6 && posicionX >= 2 ?  movimientos.push([{fila: +posicionY+1, columna: +posicionX-2}])   : ''
        posicionY <= 5 && posicionX >= 1 ?  movimientos.push([{fila: +posicionY+2, columna: +posicionX-1}])   : ''
        posicionY <= 6 && posicionX <= 5 ?  movimientos.push([{fila: +posicionY+1, columna: +posicionX+2}])   : ''
        posicionY <= 5 && posicionX <= 6 ?  movimientos.push([{fila: +posicionY+2, columna: +posicionX+1}])   : ''

        break
      
      case "Rey":
        posicionY > 0 && posicionX > 0 ? movimientos.push([{fila: posicionY-1, columna: posicionX-1}]) : ''
        posicionY > 0 && posicionX < 7 ? movimientos.push([{fila: posicionY-1, columna: posicionX+1}]) : ''
        posicionY < 7 && posicionX > 0 ? movimientos.push([{fila: posicionY+1, columna: posicionX-1}]) : ''
        posicionY < 7 && posicionX < 7 ? movimientos.push([{fila: posicionY+1, columna: posicionX+1}]) : ''
        
        posicionY > 0 ? movimientos.push([{fila: posicionY-1, columna: posicionX}]) : ""
        posicionY < 7 ? movimientos.push([{fila: posicionY+1, columna: posicionX}]) : ""
        posicionX > 0 ? movimientos.push([{fila: posicionY, columna: posicionX-1}]) : ""
        posicionX < 7 ? movimientos.push([{fila: posicionY, columna: posicionX+1}]) : ""
        
        break
    }
    return movimientos;
  }

  //Funcion para verificar el estado del juego
  verificar(){

    this.movimientosEnroque = []
    this.fichasBloqueadas = []
    this.fichaHackeMate = {}
    this.todosMovimientosFichasBlancas = []
    this.todosMovimientosFichasNegras = []
    this.reyBlanco = {}
    this.reyNegro = {}
    
    let reyBlancoAhogado = true
    let reyNegroAhogado = true

    let error : string[] = []

    this.fichasActuales.forEach((ficha)=>{
      let fichaTablero = this.tablero[ficha.posicionY][ficha.posicionX]
      let movimientos = this.obtenerMovimientos(fichaTablero, ficha.posicionY, ficha.posicionX)
      let movimientoFicha : any = []

      switch (fichaTablero.Ficha) {
        case "Rey":
          if (fichaTablero.Jugador == "primer-jugador") {
             Object.keys(this.reyBlanco).length > 1 ? error.push("Hay mas de un rey Blanco") : this.reyBlanco = {...this.reyBlanco, fila : ficha.posicionY, columna : ficha.posicionX}
          }else{
            Object.keys(this.reyNegro).length > 1 ? error.push("Hay mas de un rey Negro") : this.reyNegro = {...this.reyNegro, fila : ficha.posicionY, columna : ficha.posicionX}
          }
          movimientos.forEach((movimiento : any) => {
            fichaTablero.Jugador == "primer-jugador" ? this.todosMovimientosFichasBlancas.push({x: movimiento[0].fila, y: movimiento[0].columna}) : this.todosMovimientosFichasNegras.push({x: movimiento[0].fila, y: movimiento[0].columna})
          });

          break;
      
        case "Peon":
          for (let movimientoAdelante of movimientos[0]) {
            if (this.tablero[movimientoAdelante.fila][movimientoAdelante.columna].Ficha) {break}
            movimientoFicha.push(movimientoAdelante)
          }

          for (let movimientoAdelante of movimientos[1]) {
            fichaTablero.Jugador == "primer-jugador" ? this.todosMovimientosFichasBlancas.push({x: movimientoAdelante.fila, y: movimientoAdelante.columna}) : this.todosMovimientosFichasNegras.push({x: movimientoAdelante.fila, y: movimientoAdelante.columna})
            if (this.tablero[movimientoAdelante.fila][movimientoAdelante.columna].Ficha && this.tablero[movimientoAdelante.fila][movimientoAdelante.columna].Jugador != fichaTablero.Jugador) {
              movimientoFicha.push(movimientoAdelante)
              if (this.tablero[movimientoAdelante.fila][movimientoAdelante.columna].Ficha == "Rey") {
                this.fichaHackeMate = {fila: ficha.posicionY, columna: ficha.posicionX, movimientos : movimientos[1]}
                this.tablero[movimientoAdelante.fila][movimientoAdelante.columna].Jugador == "primer-jugador" ? this.reyBlanco = {...this.reyBlanco, hackeMate: true} : this.reyNegro = {...this.reyNegro, hackeMate: true}
              }
            }
          }
          break

        default:
          movimientos.forEach((movimiento : any) => {
            let continuarAgregando = true
            let reylocalizado = false
            let posibleFichaBloqueada = {}
            for (let movimiento2 of movimiento) {
              if (continuarAgregando ||  reylocalizado) {fichaTablero.Jugador == "primer-jugador" ? this.todosMovimientosFichasBlancas.push({x: movimiento2.fila, y: movimiento2.columna}) : this.todosMovimientosFichasNegras.push({x: movimiento2.fila, y: movimiento2.columna})}
              if ((this.tablero[movimiento2.fila][movimiento2.columna].Ficha && this.tablero[movimiento2.fila][movimiento2.columna].Jugador == fichaTablero.Jugador) || reylocalizado) {break}
              if (continuarAgregando) {movimientoFicha.push(movimiento2)}
              if (!continuarAgregando) {
                if (this.tablero[movimiento2.fila][movimiento2.columna].Ficha && this.tablero[movimiento2.fila][movimiento2.columna].Jugador != fichaTablero.Jugador) {
                  if (this.tablero[movimiento2.fila][movimiento2.columna].Ficha == "Rey") {
                    this.fichasBloqueadas.push(posibleFichaBloqueada)
                  }
                  break;
                }
              }
              if (this.tablero[movimiento2.fila][movimiento2.columna].Ficha && this.tablero[movimiento2.fila][movimiento2.columna].Jugador != fichaTablero.Jugador) {
                if (this.tablero[movimiento2.fila][movimiento2.columna].Ficha == "Rey") {
                  this.fichaHackeMate = {fila: ficha.posicionY, columna: ficha.posicionX, movimientos : movimiento}
                  reylocalizado = true
                  this.tablero[movimiento2.fila][movimiento2.columna].Jugador == "primer-jugador" ? this.reyBlanco = {...this.reyBlanco, hackeMate: true} : this.reyNegro = {...this.reyNegro, hackeMate: true}
                }
                posibleFichaBloqueada = {fila: movimiento2.fila, columna: movimiento2.columna, fichaHackeFila: ficha.posicionY, fichaHackeColumna: ficha.posicionX, movimientos: movimiento}
                continuarAgregando = false
              }
            }
          });

          break;
      }
      this.tablero[ficha.posicionY][ficha.posicionX] = {
        ...this.tablero[ficha.posicionY][ficha.posicionX],
        Movimientos: movimientoFicha
      }
    })

    Object.keys(this.reyBlanco).length == 0 ? error.push("No hay Rey Blanco") : ""
    Object.keys(this.reyNegro).length == 0 ? error.push("No hay Rey Negro") : ""

    this.jugadorActual == "primer-jugador" && this.reyNegro.hackeMate ? error.push("Se puede capturar al rey negro") : ""
    this.jugadorActual != "primer-jugador" && this.reyBlanco.hackeMate ? error.push("Se puede capturar al rey blanco") : ""

    if (error.length > 0) {
      console.error(error);
      this.gameOver = true;
      return
    }
    
    let movimientosReyBlanco = this.obtenerMovimientos(this.tablero[this.reyBlanco.fila][this.reyBlanco.columna], this.reyBlanco.fila, this.reyBlanco.columna)
    let movimientosReyNegro = this.obtenerMovimientos(this.tablero[this.reyNegro.fila][this.reyNegro.columna], this.reyNegro.fila, this.reyNegro.columna)
    
    let movimientosCompletosReyBlanco : any = []
    let movimientosCompletosReyNegro : any = []
    
    //Comprobando si se puede hacer enroque
    this.fichasActuales.forEach((ficha)=>{
      if (this.tablero[ficha.posicionY][ficha.posicionX].Ficha == "Torre" && this.tablero[this.reyBlanco.fila][this.reyBlanco.columna].Jugador == this.tablero[ficha.posicionY][ficha.posicionX].Jugador && this.tablero[ficha.posicionY][ficha.posicionX].Jugador == this.jugadorActual && this.tablero[ficha.posicionY][ficha.posicionX].Enroque && this.tablero[this.reyBlanco.fila][this.reyBlanco.columna].Enroque && !this.tablero[this.reyBlanco.fila][this.reyBlanco.columna].hackeMate) {
        let movimientosTorre = this.obtenerMovimientos(this.tablero[ficha.posicionY][ficha.posicionX], ficha.posicionY, ficha.posicionX)
        for (let movimientoTorre of movimientosTorre){
          for (let [i, movimiento] of movimientoTorre.entries()) {
            if (this.tablero[movimiento.fila][movimiento.columna].Ficha) {
              if (this.tablero[movimiento.fila][movimiento.columna].Ficha == "Rey") {
                if (i >= 2 && !this.reyBlanco.hackeMate) { 
                  if (!(this.todosMovimientosFichasNegras.some((p:any) => p.x == movimientoTorre[i-1].fila && p.y == movimientoTorre[i-1].columna))) {
                    movimientosReyBlanco.push([{fila: movimientoTorre[i-2].fila, columna: movimientoTorre[i-2].columna}])
                    this.movimientosEnroque.push({fila: movimientoTorre[i-2].fila, columna: movimientoTorre[i-2].columna, torre: {
                      fila: ficha.posicionY,
                      columna: ficha.posicionX,
                      movimiento: {fila: movimientoTorre[i-1].fila, columna: movimientoTorre[i-1].columna}
                    }})
                  }
                }
              }
              break
            }
          }
        }
      }
      if (this.tablero[ficha.posicionY][ficha.posicionX].Ficha == "Torre" && this.tablero[this.reyNegro.fila][this.reyNegro.columna].Jugador == this.tablero[ficha.posicionY][ficha.posicionX].Jugador && this.tablero[ficha.posicionY][ficha.posicionX].Jugador == this.jugadorActual && this.tablero[ficha.posicionY][ficha.posicionX].Enroque && this.tablero[this.reyNegro.fila][this.reyNegro.columna].Enroque && !this.tablero[this.reyNegro.fila][this.reyNegro.columna].hackeMate) {
        let movimientosTorre = this.obtenerMovimientos(this.tablero[ficha.posicionY][ficha.posicionX], ficha.posicionY, ficha.posicionX)
        for (let movimientoTorre of movimientosTorre){
          for (let [i, movimiento] of movimientoTorre.entries()) {
            if (this.tablero[movimiento.fila][movimiento.columna].Ficha) {
              if (this.tablero[movimiento.fila][movimiento.columna].Ficha == "Rey") {
                if (i >= 2 && !this.reyNegro.hackeMate) { 
                  if (!(this.todosMovimientosFichasBlancas.some((p:any) => p.x == movimientoTorre[i-1].fila && p.y == movimientoTorre[i-1].columna))) {
                    movimientosReyNegro.push([{fila: movimientoTorre[i-2].fila, columna: movimientoTorre[i-2].columna}])
                    this.movimientosEnroque.push({fila: movimientoTorre[i-2].fila, columna: movimientoTorre[i-2].columna, torre: {
                      fila: ficha.posicionY,
                      columna: ficha.posicionX,
                      movimiento: {fila: movimientoTorre[i-1].fila, columna: movimientoTorre[i-1].columna}
                    }})
                  }
                }
              }
              break
            }
          }
        }
      }
    })

    movimientosReyBlanco.forEach((movimiento : any) => {
      if (!(this.tablero[movimiento[0].fila][movimiento[0].columna].Ficha && this.tablero[movimiento[0].fila][movimiento[0].columna].Jugador == this.tablero[this.reyBlanco.fila][this.reyBlanco.columna].Jugador)) {
        let existe = this.todosMovimientosFichasNegras.some((p:any) => p.x == movimiento[0].fila && p.y == movimiento[0].columna)
        if (!existe) { movimientosCompletosReyBlanco.push(movimiento[0]) }
      }
    });
    this.tablero[this.reyBlanco.fila][this.reyBlanco.columna] = {...this.tablero[this.reyBlanco.fila][this.reyBlanco.columna], Movimientos: movimientosCompletosReyBlanco}
    
    movimientosReyNegro.forEach((movimiento : any) => {
      if (!(this.tablero[movimiento[0].fila][movimiento[0].columna].Ficha && this.tablero[movimiento[0].fila][movimiento[0].columna].Jugador == this.tablero[this.reyNegro.fila][this.reyNegro.columna].Jugador)) {
        let existe = this.todosMovimientosFichasBlancas.some((p:any) => p.x == movimiento[0].fila && p.y == movimiento[0].columna)
        if (!existe) { movimientosCompletosReyNegro.push(movimiento[0]) }
      }
    });
    this.tablero[this.reyNegro.fila][this.reyNegro.columna] = {...this.tablero[this.reyNegro.fila][this.reyNegro.columna], Movimientos: movimientosCompletosReyNegro}

    if (this.reyBlanco.hackeMate) {this.tablero[this.reyBlanco.fila][this.reyBlanco.columna] = {...this.tablero[this.reyBlanco.fila][this.reyBlanco.columna], hackeMate: true}} else {this.tablero[this.reyBlanco.fila][this.reyBlanco.columna] = {...this.tablero[this.reyBlanco.fila][this.reyBlanco.columna], hackeMate: false}}
    if (this.reyNegro.hackeMate) {this.tablero[this.reyNegro.fila][this.reyNegro.columna] = {...this.tablero[this.reyNegro.fila][this.reyNegro.columna], hackeMate: true}} else {this.tablero[this.reyNegro.fila][this.reyNegro.columna] = {...this.tablero[this.reyNegro.fila][this.reyNegro.columna], hackeMate: false}}

    if (this.fichasBloqueadas.length > 0) {
      this.fichasBloqueadas.forEach((FichaBloqueada : any)=>{
        let nuevosMovimientos : any = [];
        let movimientos = this.tablero[FichaBloqueada.fila][FichaBloqueada.columna].Movimientos
        for (let movimiento of movimientos) {
          if ((FichaBloqueada.movimientos.some((p:any) => p.fila == movimiento.fila && p.columna == movimiento.columna)) || (FichaBloqueada.fichaHackeFila == movimiento.fila, FichaBloqueada.fichaHackeColumna == movimiento.columna)) {
            nuevosMovimientos.push({fila: movimiento.fila, columna: movimiento.columna})
          }
        }
        this.tablero[FichaBloqueada.fila][FichaBloqueada.columna] = {...this.tablero[FichaBloqueada.fila][FichaBloqueada.columna], Movimientos: nuevosMovimientos}
      })
    }

    if (this.reyNegro.hackeMate || this.reyBlanco.hackeMate) {
      let contador = 0;
      let movimimientosHackeMate = []
      if (this.reyBlanco.hackeMate) {
        for (let movimiento of this.fichaHackeMate.movimientos) {
          if (movimiento.fila == this.reyBlanco.fila && movimiento.columna == this.reyBlanco.columna) {break}
          movimimientosHackeMate.push(movimiento)
        }
      }else{
        for (let movimiento of this.fichaHackeMate.movimientos) {
          if (movimiento.fila == this.reyNegro.fila && movimiento.columna == this.reyNegro.columna) {break}
          movimimientosHackeMate.push(movimiento)
        }
      }
      this.fichaHackeMate = {...this.fichaHackeMate, movimientos : movimimientosHackeMate}
      this.fichasActuales.forEach((ficha)=>{
        let nuevosMovimientos : any = []
        if (this.reyNegro.hackeMate) {
          if (this.tablero[ficha.posicionY][ficha.posicionX].Jugador == this.tablero[this.reyNegro.fila][this.reyNegro.columna].Jugador) {
            if (this.tablero[ficha.posicionY][ficha.posicionX].Ficha != "Rey") {
              let movimientos = this.tablero[ficha.posicionY][ficha.posicionX].Movimientos
              for (let movimiento of movimientos) {
                if ((movimiento.fila == this.fichaHackeMate.fila && movimiento.columna == this.fichaHackeMate.columna) || (this.fichaHackeMate.movimientos.some((p:any) => p.fila == movimiento.fila && p.columna == movimiento.columna))) {
                  nuevosMovimientos.push({fila: movimiento.fila, columna: movimiento.columna})
                  contador++
                }
              }
            }else{
              if (this.tablero[ficha.posicionY][ficha.posicionX].Movimientos.length > 0) {
                nuevosMovimientos = this.tablero[ficha.posicionY][ficha.posicionX].Movimientos
                contador++
              }
            }
            this.tablero[ficha.posicionY][ficha.posicionX] = {...this.tablero[ficha.posicionY][ficha.posicionX], Movimientos: nuevosMovimientos}
          }
        }else{
          if (this.tablero[ficha.posicionY][ficha.posicionX].Jugador == this.tablero[this.reyBlanco.fila][this.reyBlanco.columna].Jugador) {
            if (this.tablero[ficha.posicionY][ficha.posicionX].Ficha != "Rey") {
              let movimientos = this.tablero[ficha.posicionY][ficha.posicionX].Movimientos
              for (let movimiento of movimientos) {
                if (movimiento.fila == ficha.posicionY && movimiento.columna == ficha.posicionX) {break}
                if ((movimiento.fila == this.fichaHackeMate.fila && movimiento.columna == this.fichaHackeMate.columna) || (this.fichaHackeMate.movimientos.some((p:any) => p.fila == movimiento.fila && p.columna == movimiento.columna))) {
                  nuevosMovimientos.push({fila: movimiento.fila, columna: movimiento.columna})
                  contador++
                }
              }
            }else{
              if (this.tablero[ficha.posicionY][ficha.posicionX].Movimientos.length > 0) {
                nuevosMovimientos = this.tablero[ficha.posicionY][ficha.posicionX].Movimientos
                contador++
              }
            }
            this.tablero[ficha.posicionY][ficha.posicionX] = {...this.tablero[ficha.posicionY][ficha.posicionX], Movimientos: nuevosMovimientos}
          }
        }
      })
      if (contador === 0) {
        this.gameOver = true;
        if (this.jugadorActual == "primer-jugador") {
          this.ganador = "Negras"
        }else{
          this.ganador = "Blancas"
        }
        alert("Las fichas " + this.ganador + " han ganado")
        return
      }
    }

    //Comprobando si se puede mover las fichas del jugador correspondiente
    this.fichasActuales.forEach((ficha)=>{
      if (this.tablero[ficha.posicionY][ficha.posicionX].Movimientos.length > 0) {
        if (this.tablero[ficha.posicionY][ficha.posicionX].Jugador == "primer-jugador") {
          reyBlancoAhogado = false
        }else{
          reyNegroAhogado = false
        }
      }
    })

    if (reyBlancoAhogado && this.jugadorActual == "primer-jugador") {
      this.gameOver = true;
      alert("El rey blanco esta ahogado")
    }

    if (reyNegroAhogado && this.jugadorActual != "primer-jugador") {
      this.gameOver = true;
      alert("El rey negro esta ahogado")
    }
  }
}

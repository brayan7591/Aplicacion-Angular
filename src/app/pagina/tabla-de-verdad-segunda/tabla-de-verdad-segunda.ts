import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-de-verdad-segunda',
  imports: [],
  templateUrl: './tabla-de-verdad-segunda.html',
  styleUrl: './tabla-de-verdad-segunda.css',
})
export class TablaDeVerdadSegunda {
  comenzarCon: string = "V"
  numero : number = 0;
  arrayCompleto: string[][] = [];
  arrayColumnas : string[] = []

  crearArray(evento: any){
    this.arrayCompleto = []
    this.numero = +evento.srcElement.value
    this.arrayColumnas = Array(this.numero);
    for (let indexPrimero = 0; indexPrimero < 2**this.numero; indexPrimero++) {
      let columnas : string[] = []
      let numerodivisible = 0
      for (let indexSegundo = 0; indexSegundo < this.numero; indexSegundo++) {
        numerodivisible = (2**this.numero/(2**(indexSegundo+1)))
        if (indexPrimero == 0) { 
          columnas.push(this.comenzarCon)
        }else{
          let dato = this.arrayCompleto[indexPrimero-1][indexSegundo]
          if (indexPrimero % numerodivisible == 0) { dato == "V" ? dato = "F" : dato = "V" }
          columnas.push(dato)
        }
      }
      let datosActuales : string[] = columnas;
      columnas.push(this.operacion(datosActuales, "&"))
      columnas.push(this.operacion(datosActuales, "|"))
      this.arrayCompleto.push(columnas);
    }
  }

  operacion(elArray: string[], operador : string): string{
    let resultado = "No se pudo completar";
    switch (operador) {
      case "&":
        elArray.includes("F") ? resultado = "F" : resultado = "V"
        break;
      case "|":
        elArray.includes("V") ? resultado = "V" : resultado = "F"
        break;
      default:
        break;
    }

    return resultado
  }
}

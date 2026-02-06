import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Subject, switchMap, tap, finalize, from, of, catchError, startWith, timer } from 'rxjs';

@Component({
  selector: 'app-tabla-de-verdad-primera',
  imports: [CommonModule],
  templateUrl: './tabla-de-verdad-primera.html',
  styleUrl: './tabla-de-verdad-primera.css',
})
export class TablaDeVerdadPrimera {
  error: string = "";
  num: number = 0;
  arraycompleto: string[][] = [];
  private subject$ = new Subject<number>();
  isLoading = signal(false);

  async obtenerDatos(valor: number){
    await new Promise(resolve => setTimeout(resolve, 0));
    this.num = valor
    this.arraycompleto = []
    for (let indexprimero = 0; indexprimero < this.num; indexprimero++) {
      let datoDelIndex = indexprimero + 1;
      let arrayColumnas : string[] = []
      let dato = "V"
      let contador = 0
      for (let index = 0; index < 2**this.num; index++) {
        contador++
        if (contador == ((2**this.num)/(2**datoDelIndex))) {
          dato == "V" ? dato = "F" : dato = "V"
          contador = 0
        }
        arrayColumnas.push(dato)
      }
      let ultimo = arrayColumnas.pop();
      if (ultimo !== undefined) {
        arrayColumnas.unshift(ultimo);
      }
      this.arraycompleto.push(arrayColumnas)
    }
    return this.arraycompleto
  }

  data$ = this.subject$.pipe(
    tap(() => {this.isLoading.set(true)}),
    switchMap(elValor => {
        const loading$ = timer(300).pipe(
        tap(() => this.isLoading.set(true))
      );

      const data$ = from(this.obtenerDatos(elValor)).pipe(
        catchError(err => {
          console.error('Error:', err);
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      );

      return loading$.pipe(
        switchMap(() => data$),
        startWith(null) // limpia el contenido
      );
    })
  );

  crearArrays(evento : any) {
    this.error = "";
    if (isNaN(+evento.srcElement.value)) {
      this.error = "No se aceptan valores que no sean numerossssssssssssssssss, please";
      this.subject$.next(0);
      return;
    }

    if (+evento.srcElement.value > 10) {
      this.error = "El numero " + +evento.srcElement.value + " es mas grande que 10, eso es mucho y no se procesara";
      this.subject$.next(0);
      return;
    }else{
      this.subject$.next(+evento.srcElement.value);
    }

  }
}

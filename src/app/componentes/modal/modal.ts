import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styles: `
    input{
      width: 100%;
    }
    label{
      display: block;
      margin: 50px 0;
    }

    div{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
    }

    button{
      cursor: pointer;
    }
  `,
})
export class Modal {

  estilos = getComputedStyle(document.documentElement);

  ColorFondo = this.estilos.getPropertyValue('--color-fondo').trim();
  ColorFondoInput = this.estilos.getPropertyValue('--color-fondo').trim();

  ColorPrincipal = this.estilos.getPropertyValue('--color-principal').trim();
  ColorPrincipalInput = this.estilos.getPropertyValue('--color-principal').trim();

  ColorSecundario = this.estilos.getPropertyValue('--color-secundario').trim();
  ColorSecundarioInput = this.estilos.getPropertyValue('--color-secundario').trim();

  ColorTitulos = this.estilos.getPropertyValue('--color-titulos').trim();
  ColorTitulosInput = this.estilos.getPropertyValue('--color-titulos').trim();

  ColorSubtitulos = this.estilos.getPropertyValue('--color-subtitulos').trim();
  ColorSubtitulosInput = this.estilos.getPropertyValue('--color-subtitulos').trim();

  resetearColores(){
    document.documentElement.style.setProperty('--color-fondo', this.ColorFondo);
    this.ColorFondoInput = this.ColorFondo;

    document.documentElement.style.setProperty('--color-principal', this.ColorPrincipal);
    this.ColorPrincipalInput = this.ColorPrincipal;

    document.documentElement.style.setProperty('--color-secundario', this.ColorSecundario);
    this.ColorSecundarioInput = this.ColorSecundario;

    document.documentElement.style.setProperty('--color-titulos', this.ColorTitulos);
    this.ColorTitulosInput = this.ColorTitulos

    document.documentElement.style.setProperty('--color-subtitulos', this.ColorSubtitulos);
    this.ColorSubtitulosInput = this.ColorSubtitulos
  }

  cambiarColor(dato : string, evento: any){
    switch (dato) {
      case "fondo":
        this.ColorFondoInput = evento.target.value;
        document.documentElement.style.setProperty('--color-fondo', this.ColorFondoInput);

        break;
      case "principal":
        this.ColorPrincipalInput = evento.target.value;
        document.documentElement.style.setProperty('--color-principal', this.ColorPrincipalInput);
        break;
    
      case "secundario":
        this.ColorSecundarioInput = evento.target.value;
        document.documentElement.style.setProperty('--color-secundario', this.ColorSecundarioInput);
        break;

      case "titulos":
        this.ColorTitulosInput = evento.target.value;
        document.documentElement.style.setProperty('--color-titulos', this.ColorTitulosInput);
        break;

      case "subtitulos":
        this.ColorSubtitulosInput = evento.target.value;
        document.documentElement.style.setProperty('--color-subtitulos', this.ColorSubtitulosInput);
        break;

    }
  }
}

import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
          <a routerLink=""><li>inicio</li></a>
          <a routerLink="Tabla-de-verdad-primera"><li>Tabla de verdad 1</li></a>
          <a routerLink="Tabla-de-verdad-segunda"><li>Tabla de verdad 2</li></a>
          <a routerLink="Ajedrez"><li>Ajedrez (primera version)</li></a>
          <a routerLink="Ajedrez-segundo"><li>Ajedrez (Segunda version)</li></a>
      </ul>
    </nav>
  `,
  styles: `
    nav{
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      ul{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin: 0;
        padding: 0;
        a{
          list-style: none;
          font-size: 15px;
          background-color: blue;
          padding: 10px;
          text-decoration: none;
          color: white;
          &:hover{
            background-color: darkblue;
          }
        }
      }
    }
  `,
})

export class Header {

}

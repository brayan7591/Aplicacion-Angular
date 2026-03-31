import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Modal],
  template: `
    <nav>
      <ul>
          <a routerLink="" routerLinkActive="Activo" [routerLinkActiveOptions]="{exact: true}"><li>Tres en raya</li></a>
          <a routerLink="Tabla-de-verdad-primera" routerLinkActive="Activo"><li>Tabla de verdad 1</li></a>
          <a routerLink="Tabla-de-verdad-segunda" routerLinkActive="Activo"><li>Tabla de verdad 2</li></a>
          <a routerLink="Ajedrez" routerLinkActive="Activo"><li>Ajedrez (primera version)</li></a>
          <a routerLink="Ajedrez-segundo" routerLinkActive="Activo"><li>Ajedrez (Segunda version)</li></a>
          <button command="show-modal" commandfor="modal_ajustes" title="Ajustes"><img src="images/Engranaje.png" alt="Ajustes"></button>
      </ul>
    </nav>
    <app-modal></app-modal>
  `,
  styles: `
    @keyframes animacion {
      from {rotate: 0}
      to {rotate: 180deg}
    }
    nav{
      overflow-x: auto;
      scrollbar-width: none;
      ul{
        min-width: max-content;
        display: flex;
        border-collapse: collapse;
        flex-direction: row;
        align-items: center;
        margin: 0;
        padding: 0;
        width: 100%;
        button{
          padding: 10px;
          font-size: 1.4rem;
          background-color: var(--color-secundario);
          cursor: pointer;
          border: solid 1px black;
          margin-left: auto;
          &:hover{
             background-color: var(--color-principal);
            img{
              animation: animacion 2s ease-in-out infinite;
            }
          }
          img{
            height: 1.4rem;
            width: auto;
            display: block;
          }
        }
        a{
          list-style: none;
          font-size: 1.4rem;
          background-color: var(--color-secundario);
          border: solid 1px black;
          padding: 10px;
          text-decoration: none;
          text-align: center;
          color: gray;
          &:hover{
            background-color: var(--color-principal);
            color: white;
          }
          &.Activo{
            background-color: var(--color-principal);
            color: white;
            cursor: default;
            pointer-events: none;
          }
        }
      }
    }
  `,
})

export class Header {

}

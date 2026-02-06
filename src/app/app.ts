import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './componentes/footer/footer';
import { Header } from './componentes/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  template: `
    <header>
      <app-header></app-header>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <app-footer></app-footer>
    </footer>
  `,
  styleUrl: './app.css'
})
export class App {}

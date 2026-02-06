import { Routes } from '@angular/router';
import { TablaDeVerdadPrimera } from './pagina/tabla-de-verdad-primera/tabla-de-verdad-primera';
import { TablaDeVerdadSegunda } from './pagina/tabla-de-verdad-segunda/tabla-de-verdad-segunda';
import { Inicio } from './pagina/inicio/inicio';
import { Ajedrez } from './pagina/ajedrez/ajedrez';
import { AjedrezSegundo } from './pagina/ajedrez-segundo/ajedrez-segundo';

export const routes: Routes = [
    {path: '', component:Inicio},
    {path: 'Tabla-de-verdad-primera', component:TablaDeVerdadPrimera},
    {path: 'Tabla-de-verdad-segunda', component:TablaDeVerdadSegunda},
    {path: 'Ajedrez', component:Ajedrez},
    {path: 'Ajedrez-segundo', component:AjedrezSegundo},
    {path: '**', redirectTo: ''}
];

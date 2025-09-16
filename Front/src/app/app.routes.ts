import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login.component/login.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },   // <- agregada
  { path: 'login', component: LoginComponent },
  // opcionalmente, ruta comodín para 404
  { path: '**', redirectTo: 'landing' }
];


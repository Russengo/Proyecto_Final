import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login.component/login.component';
import { LandingComponent } from './componentes/landing/landing';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },   // Por defecto a la landing
  { path: 'landing', component: LandingComponent },         // landing 
  { path: 'login', component: LoginComponent },             // login 
  { path: '**', redirectTo: 'landing' }                     // cualquier otra ruta va a redirigir a la de defecto
];


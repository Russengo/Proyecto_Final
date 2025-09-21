import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login.component/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component'

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Home es el login directamente
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }            // Cualquier ruta inválida vuelve al login
];


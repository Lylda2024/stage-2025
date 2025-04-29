import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DegratationFormComponent } from './degratation-form/degratation-form.component';
import { MapComponent } from './map/map.component';

// Définition des routes pour l'application
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'incident', component: DegratationFormComponent },
  { path: 'map', component: MapComponent }, // ← Doit venir avant '**'
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

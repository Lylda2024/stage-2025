import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DegratationFormComponent } from './degratation-form/degratation-form.component';
import { MapComponent } from './map/map.component';
import { ApercuIncidentComponent } from './apercu-incident/apercu-incident.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ListeDegradationsComponent } from './liste-degradations/liste-degradations.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Définition des routes pour l'application
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'incident', component: DegratationFormComponent },
  { path: 'map', component: MapComponent },
  { path: 'aperçu-incident', component: ApercuIncidentComponent },
  { path: 'liste', component: ListeDegradationsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // ou '/dashboard' selon le besoin
  { path: '**', redirectTo: '/login' },
];

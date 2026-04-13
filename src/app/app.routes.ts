import { Routes } from '@angular/router';
import { AppointmentPage } from './features/appointment/pages/appointment-page/appointment-page';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'appointments', component: AppointmentPage }
];
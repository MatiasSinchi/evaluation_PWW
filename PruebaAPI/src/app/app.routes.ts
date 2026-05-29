import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DetailComponent } from './pages/detail/detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:name', component: DetailComponent },
  { path: '**', redirectTo: '' }
];

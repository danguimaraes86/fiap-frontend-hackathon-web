import { Routes } from '@angular/router';
import { HomeView } from './pages/home-view/home-view';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeView
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFound),
  }
];

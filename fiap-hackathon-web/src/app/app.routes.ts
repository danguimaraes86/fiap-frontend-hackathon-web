import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';
import { HomeView } from './pages/home-view/home-view';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeView,
    canActivate: [redirectIfAuthenticatedGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-view/dashboard-view').then(c => c.DashboardView),
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks-view/tasks-view').then(c => c.TasksView),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFound),
  }
];

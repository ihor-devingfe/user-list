import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', loadChildren: () => import('./users-page/users-page.routes').then(m => m.routes) },
  { path: '**', component: NotFoundComponent },
];

import { Routes } from '@angular/router';
import { NotFoundComponent } from '../../../not-found/not-found.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UsersPageComponent } from './users-page.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    children: [
      { path: 'user/create', component: CreateUserComponent, outlet: 'details' },
      { path: 'user/:username/update', component: UpdateUserComponent, outlet: 'details' },
      { path: 'user/not-found', component: NotFoundComponent, outlet: 'details' },
      { path: '**', component: NotFoundComponent, outlet: 'details' },
    ],
  },
];

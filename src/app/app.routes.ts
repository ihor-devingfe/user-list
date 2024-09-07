import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutPageComponent } from './page/components/about-page/about-page.component';
import { ProductsPageComponent } from './page/components/products-page/products-page.component';
import { CreateUserComponent } from './page/components/users-page/components/create-user/create-user.component';
import { UpdateUserComponent } from './page/components/users-page/components/update-user/update-user.component';
import { UsersPageComponent } from './page/components/users-page/users-page.component';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page' },
  {
    path: 'page',
    component: PageComponent,
    children: [
      { path: 'users', component: UsersPageComponent },
      { path: 'create-user', component: CreateUserComponent, outlet: 'details' },
      { path: 'user/:username/update', component: UpdateUserComponent, outlet: 'details' },
      { path: 'user/not-found', component: NotFoundComponent, outlet: 'details' },

      { path: 'products', component: ProductsPageComponent },
      { path: 'about', component: AboutPageComponent },

      { path: '**', component: NotFoundComponent, outlet: 'details' },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

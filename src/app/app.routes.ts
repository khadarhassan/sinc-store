import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

// Todo: lazy load the components
export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'products/:id',
    title: 'Product',
    component: ProductsComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];

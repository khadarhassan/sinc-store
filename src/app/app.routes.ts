import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { ProductComponent } from './products/products.component';

// Todo: lazy load the components
export const routes: Routes = [
  {
    path: '',
    title: 'Products',
    component: ProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'products/:id',
    title: 'Product detail',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];

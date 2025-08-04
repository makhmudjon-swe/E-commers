import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ShopCart } from './shop-cart/shop-cart';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: 'cart', component: ShopCart },
];

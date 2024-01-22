import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { CartShopComponent } from './components/cart-shop/cart-shop.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'product/:product', component: ProductDetailsComponent },
  { path: 'catalog', component: ProductsCatalogComponent },
  { path: 'cart-shop', component: CartShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

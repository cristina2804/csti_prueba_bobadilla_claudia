import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http' // buscar
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { SearchProductComponent } from './components/shared/header/search-product/search-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCardComponent } from './components/home/product-card/product-card.component';
import { NumberMilPipe } from './pipes/number-mil.pipe';
import { NumberDecimalPipe } from './pipes/number-decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    BannerComponent,
    SearchProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    NumberMilPipe,
    NumberDecimalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

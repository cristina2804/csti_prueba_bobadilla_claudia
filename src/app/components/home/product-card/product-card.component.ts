import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  isExpandedImage = false;

  @Input()
  producto: Producto = null;

  productos: Producto[] = [];

  constructor(private storeService:StoreService, private router: Router) { }

  ngOnInit() {
    // this.getProducts();
  }

  // getProducts() {
  //   this.storeService.getAllProducts().subscribe((data) => {
  //     this.products = data
  //   })
  // }

  // addToCart(producto: Producto) {
  //   this.storeService.addProduct(producto)
  // }

  toProduct(producto: string) {
    this.router.navigate(['/product/', producto]);
  }

  expandImage() {
    this.isExpandedImage = true;
  }

  collapseImage() {
    this.isExpandedImage = false;
  }

}

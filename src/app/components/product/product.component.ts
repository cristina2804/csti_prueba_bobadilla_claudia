import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  isExpandedImage = false;

  @Input()
  product: Product = null;

  products: Product[] = [];

  constructor(private storeService:StoreService) { }

  ngOnInit() {
    // this.getProducts();
  }

  // getProducts() {
  //   this.storeService.getAllProducts().subscribe((data) => {
  //     this.products = data
  //   })
  // }

  addToCart(product: Product) {
    this.storeService.addProduct(product)
  }

  expandImage() {
    this.isExpandedImage = true;
  }

  collapseImage() {
    this.isExpandedImage = false;
  }

}

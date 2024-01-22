import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  isExpandedImage = false;

  @Input()
  producto: Producto = null;

  @Input()
  showButton: boolean = false;

  productos: Producto[] = [];

  constructor(private router: Router) { }

  static calculateDataPerview() {
    const screenWidth = window.innerWidth;

    // Ajusta data-perview en función del ancho de la pantalla
    if (screenWidth > 1200) {
      return 4;
    } else if (screenWidth > 1000) {
      return 3;
    } else if (screenWidth > 800) {
      return 2;
    } else {
      return 1;
    }
  }

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

import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  producto: Producto = null;
  cantidadesProducto: number[] = [];
  cantidadProducto: number = 1;
  keyItem: string;
  imagenSelected: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.keyItem = this.route.snapshot.paramMap.get('product');
    this.getProduct();
  }

  getProduct() {
    console.log(this.keyItem)
    this.apiService.getProducto(this.keyItem).subscribe((data: any) => {
      this.producto = data;
      this.cantidadesProducto = Array.from({ length: data.stockDisponible }, (_, index) => index + 1);
      this.imagenSelected = data.imagenes.length > 0 ? data.imagenes[0] : null;
    })
  }

  selectImage(imagen: string) {
    this.imagenSelected = imagen;
  }

}

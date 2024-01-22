import { Component, HostListener, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  dataPerview: number = 4;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataPerview = ProductCardComponent.calculateDataPerview();
    this.getAllCategorias();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataPerview = ProductCardComponent.calculateDataPerview();
  }

  getAllProductos() {
    let categorias = this.categorias.filter((el: any) => el.isChecked);
    if (categorias.length > 0) {
      categorias = categorias.map((el: any) => el.idCategoria).sort((a, b) => a - b);
    } else {
      categorias = this.categorias.map((el: any) => el.idCategoria).sort((a, b) => a - b);
    }
    
    this.apiService.getAllProductosFilters("destacados=true&idsCategorias=" + categorias.join(',')).subscribe((data) => {
      this.productos = data
    })
  }

  getAllCategorias() {
    this.apiService.getAllFilterCategorias().subscribe((data: any) => {
      this.categorias = data.contadorFiltroCategoria.map((el: any) => {
        return {...el, isChecked: false}
      })
      this.getAllProductos();
    })
  }

  toggleCheckbox(index: number) {
    this.categorias[index].isChecked = !this.categorias[index].isChecked;
    this.getAllProductos();
  }

}

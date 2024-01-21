import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  searchTerm: string = '';
  searchResults$: Observable<any[]>;
  productos:Producto[] = [];
  focusInput: boolean = false;

  constructor(private apiService:ApiService) {
  }

  onInputFocus() {
    this.focusInput = true;
  }

  onInputBlur() {
    this.focusInput = false;
  }

  search() {
    this.productos = [];
    this.apiService.getSearchProductos(
      "busqueda=" + this.searchTerm
    ).subscribe((data: any) => {
      if (data.estado == 0)
        this.productos = data.result
      console.log(this.productos)
    })
  }

}

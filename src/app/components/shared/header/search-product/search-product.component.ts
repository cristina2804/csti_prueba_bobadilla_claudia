import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  searchTerm: FormControl = new FormControl();
  searchResults$: Observable<any[]>;
  productos:Producto[] = [];
  productosEncontrados:Producto[] = [];
  focusInput: boolean = false;

  constructor(private apiService:ApiService, private router: Router) {
  }

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms después de que se haya dejado de escribir
        distinctUntilChanged(), // Asegura que el valor sea diferente al anterior
        filter(term => term.length >= 3), // Filtra solo términos con longitud mayor o igual a 3
        switchMap((term: string) => this.search(term))
      )
      .subscribe((data: any) => {
        if (data.estado == 0)
          this.productos = data.result
        console.log(this.productos)
      });
  }
  
  onInputFocus() {
    this.focusInput = true;
  }

  onInputBlur() {
    this.focusInput = false;
  }

  search(term: string) {
    if (term && term.length >= 3) {
      if (term.length >= 3 && this.productosEncontrados.length == 0) {
        return this.apiService.getSearchProductos("busqueda=" + term.substring(0,3))
          .pipe(
            filter((data: any) => data.estado === 0),
            switchMap((data: any) => {
              this.productosEncontrados = data.result;
              this.productos = this.productosEncontrados;
              console.log(this.productos);
              return [];
            })
          );
      } else {
        this.productos = this.productosEncontrados.filter(producto =>
          producto.titulo.toLowerCase().includes(term.toLowerCase())
        );
        console.log(this.productos);
        return [];
      }
    } else {
      this.productosEncontrados = [];
      this.productos = [];
      return [];
    }
  }

  toProduct(producto: string) {
    this.router.navigate(['/product/', producto]);
  }

}

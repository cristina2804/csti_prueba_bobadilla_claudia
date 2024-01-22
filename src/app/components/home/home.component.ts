import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos:Producto[] = [];
  dataPerview:number = 4;
  
  constructor(private apiService:ApiService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataPerview = ProductCardComponent.calculateDataPerview();
  }

  getAllProductos() {
    this.apiService.getAllProductos("destacados=true").subscribe((data) => {
      this.productos = data
    })
  }

  toCatalog() {
    this.router.navigate(['/catalog']);
  }

  ngOnInit() {
    this.dataPerview = ProductCardComponent.calculateDataPerview();
    this.getAllProductos();
  }

}
 
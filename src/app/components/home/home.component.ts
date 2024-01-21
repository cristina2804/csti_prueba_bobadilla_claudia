import { Component, HostListener, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos:Producto[] = [];
  dataPerview:number = 4;
  
  constructor(private apiService:ApiService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateDataPerview();
  }

  calculateDataPerview() {
    const screenWidth = window.innerWidth;

    // Ajusta data-perview en función del ancho de la pantalla
    if (screenWidth > 1200) {
      this.dataPerview = 4;
    } else if (screenWidth > 1000) {
      this.dataPerview = 3;
    } else if (screenWidth > 800) {
      this.dataPerview = 2;
    } else {
      this.dataPerview = 1;
    }
  }

  getAllProductos() {
    this.apiService.getAllProductos("destacados=true").subscribe((data) => {
      this.productos = data
      console.log(this.productos)
    })
  }

  ngOnInit() {
    this.calculateDataPerview();
    this.getAllProductos();
  }

}
 
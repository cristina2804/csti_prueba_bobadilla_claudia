import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild(CarouselComponent, { static: false }) carousel: CarouselComponent;

  producto: Producto = null;
  cantidadesProducto: number[] = [];
  cantidadProducto: number = 1;
  keyItem: string;
  imagenSelected: string;
  dataPerview:number = 4;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.keyItem = this.route.snapshot.paramMap.get('product');
    this.getProduct();
  }

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

  currentImageIndex = 0;
  private startX: number;

  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.startX = event.touches[0].clientX;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length === 1) {
      event.preventDefault();
      const deltaX = event.touches[0].clientX - this.startX;

      // Cambiar de imagen solo si se ha arrastrado una cantidad suficiente
      if (deltaX > 150 && this.currentImageIndex > 0) {
        this.carousel.previousSlide();
        this.startX = event.touches[0].clientX;
        this.currentImageIndex--;
      } else if (deltaX < -150 && this.currentImageIndex < this.producto.productosRelacionados.length - 1) {
        this.carousel.nextSlide();
        this.startX = event.touches[0].clientX;
        this.currentImageIndex++;
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    // Limpiar cualquier lógica necesaria al finalizar el toque
  }
  
}

import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { StoreService } from 'src/app/services/store.service';

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
  showError: boolean = false;

  constructor(private apiService: ApiService, private storeService: StoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.keyItem = this.route.snapshot.paramMap.get('product');
    this.route.params.subscribe(params => {
      this.keyItem = params['product']
      this.getProduct();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.dataPerview = ProductCardComponent.calculateDataPerview();
  }

  getProduct() {
    this.apiService.getProducto(this.keyItem).subscribe((data: any) => {
      if (data) {
        this.showError = false;
        this.producto = { ...data, imagenOportunidad: '/ficha-tecnica/' + data.imagenes[0], cantidad: 1 };
        console.log(this.producto);
        this.cantidadesProducto = Array.from({ length: data.stockDisponible }, (_, index) => index + 1);
        this.imagenSelected = data.imagenes.length > 0 ? data.imagenes[0] : null;
      } else {
        this.showError = true;
      }
    },
    error => {
      this.producto = null;
      this.showError = true;
      console.error(error, 'errror generado');
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
  
  addCart(producto, redirect) {
    this.storeService.addProduct(producto);
    if (redirect) {
      this.router.navigate(['/cart-shop']);
    }
  }

}

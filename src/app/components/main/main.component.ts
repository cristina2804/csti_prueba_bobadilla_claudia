import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products:Product[] = [];
  dataPerview:number = 4;
  
  constructor(private storeService:StoreService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenWidth = window.innerWidth;

    // Ajusta data-perview en función del ancho de la pantalla
    if (screenWidth > 1200) {
      this.dataPerview = 4;
    } else if (screenWidth > 900) {
      this.dataPerview = 3;
    } else if (screenWidth > 600) {
      this.dataPerview = 2;
    } else {
      this.dataPerview = 1;
    }
  }

  ngOnInit() {
    this.storeService.getAllProducts().subscribe((data) => {
      this.products = data
      console.log(this.products)
    })
  }

}
 
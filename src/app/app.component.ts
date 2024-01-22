import { Component } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csti-prueba';

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    console.log('inicio de toda la pagina')
    const cartList = localStorage.getItem('cart')
    this.storeService.setCart(JSON.parse(cartList))
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  viewCart: boolean = false;
  myCart$ = this.storeService.myCart$;

  constructor(private storeService: StoreService, private router: Router) { }

  onToggleCart() {
    this.viewCart = !this.viewCart
  };

  toHome() {
    this.router.navigate(['/']);
  }

  toCartShop() {
    this.router.navigate(['/cart-shop']);
  }

}

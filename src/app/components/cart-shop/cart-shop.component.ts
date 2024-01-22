import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.scss']
})
export class CartShopComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  myCart$ = this.storeService.myCart$;

  ngOnInit() {
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private myList: Producto[] = [];
  
  private myCart = new BehaviorSubject<Producto[]>([]);
  myCart$ = this.myCart.asObservable();
  
  setCart(productos: Producto[]) {
    this.myCart.next(productos);
  }

  addProduct(producto: Producto) {
    if (this.myList.length === 0) {
      // producto.cantidad = 1;
      this.myList.push(producto);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);
      console.log(this.myCart)
    } else {
      const productMod = this.myList.find((element) => {
        return element.keyItem === producto.keyItem
      })
      if (productMod) {
        productMod.cantidad = productMod.cantidad + producto.cantidad;
        this.myCart.next(this.myList);
      } else {
        producto.cantidad = 1;
        this.myList.push(producto);
        this.myCart.next(this.myList);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }

  findProductById(id: string) {
    return this.myList.find((element) => {
      return element.keyItem === id
    })
  }

  deleteProduct(id: string) {
    this.myList = this.myList.filter((producto) => {
      return producto.keyItem != id
    })
    this.myCart.next(this.myList);
  }
  
  totalCart() {
    const total = this.myList.reduce(function (acc, producto) { return acc + (producto.cantidad * producto.precioPuntosRegular); }, 0)
    return total
  }

}

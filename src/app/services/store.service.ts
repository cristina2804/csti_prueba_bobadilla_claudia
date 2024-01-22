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
    const currentCart = this.myCart.value;
    if (currentCart.length === 0) {
      currentCart.push(producto);
      //emito la lista para los que estén escuchando
      this.myCart.next(currentCart);
    } else {
      const indexProduct = currentCart.findIndex((element) => {
        return element.keyItem === producto.keyItem
      })
      if (indexProduct > -1) {
        this.myCart.value[indexProduct].cantidad = this.myCart.value[indexProduct].cantidad + producto.cantidad;
        this.myCart.next(currentCart);
      } else {
        currentCart.push(producto);
        this.myCart.next(currentCart);
      }
    }
    console.log(this.myCart.value);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  findProductById(keyItem: string) {
    return null;
    // const currentCart = this.myCart.value;
    // const indexProduct = currentCart.findIndex((element) => {
    //   return element.keyItem === keyItem
    // })
    // currentCart.splice(indexProduct, 1);
    // this.myCart.next(currentCart)
  }

  deleteProduct(keyItem: string) {
    const currentCart = this.myCart.value;
    const indexProduct = currentCart.findIndex((element) => {
      return element.keyItem === keyItem
    })
    currentCart.splice(indexProduct, 1);
    this.myCart.next(currentCart)
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  
  totalCart() {
    const currentCart = this.myCart.value;
    const total = currentCart.reduce(function (acc, producto) { return acc + (producto.cantidad * producto.precioPuntos); }, 0)
    const totalSoles = currentCart.reduce(function (acc, producto) { return acc + (producto.cantidad * producto.precioCatalogo); }, 0)
    return { totalMillas: total, totalSoles: totalSoles }
  }

}

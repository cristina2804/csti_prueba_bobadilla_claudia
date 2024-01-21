import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl = 'https://api.escuelajs.co/api/v1/'
  baseUrlBenefit = 'https://www.interbankbenefit.pe/'

  constructor(private httpClient: HttpClient) { }

  private myList: Product[] = [];
  
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  
  getAllProducts(): Observable<Product[]> {
    const response = this.httpClient.get<Product[]>(`${this.baseUrl}products`)
    return response
  }
  
  addProduct(product: Product) {
    // debugger;
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);

    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        //ojo hay que emitir la lista!!
        this.myCart.next(this.myList);
      }
    }
  }

  findProductById(id: string) {
    return this.myList.find((element) => {
      return element.id === id
    })
  }

  deleteProduct(id: string) {
    this.myList = this.myList.filter((product) => {
      return product.id != id
    })
    this.myCart.next(this.myList);
  }
  
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0)
    return total
  }

}

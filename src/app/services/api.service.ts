import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://54156843-d1f5-4452-a2f8-021ea4dca22c.mock.pstmn.io/'

  constructor(private httpClient: HttpClient) { }

  private myList: Producto[] = [];
  
  private myCart = new BehaviorSubject<Producto[]>([]);
  myCart$ = this.myCart.asObservable();
  
  getAllProductos(paramsQuery: string): Observable<Producto[]> {
    const response = this.httpClient.get<Producto[]>(`${this.baseUrl}benefit-prueba/listar?${paramsQuery}`)
    return response
  }

  getSearchProductos(paramsQuery: string): Observable<Producto[]> {
    const response = this.httpClient.get<Producto[]>(`${this.baseUrl}benefit-prueba/microservice-producto/resultados/listarBusqueda?${paramsQuery}`)
    return response
  }

  getProducto(param: string): Observable<Producto> {
    const response = this.httpClient.get<Producto>(`${this.baseUrl}benefit-prueba/microservice-producto/detalleProducto/${param}`)
    return response
  }
  
}

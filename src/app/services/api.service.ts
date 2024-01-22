import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseUrl = 'https://a912339b-8166-4525-a18e-13511c9acd85.mock.pstmn.io/'
  baseUrl = 'https://847b0772-82b3-42c7-80e0-5985267a42b8.mock.pstmn.io/'

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
    return response.pipe(
      catchError(this.handleError)
    );
  }
  
  getAllFilterCategorias(): Observable<Categoria[]> {
    const response = this.httpClient.get<Categoria[]>(`${this.baseUrl}benefit-prueba/microservice-producto/productos/filtros?destacados=true`)
    return response
  }

  getAllProductosFilters(paramsQuery: string): Observable<Producto[]> {
    const response = this.httpClient.get<Producto[]>(`${this.baseUrl}benefit-prueba/microservice-producto/productos/listar?${paramsQuery}`)
    return response
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      // Aquí puedes realizar acciones específicas para el error 500
      console.error('Error 500 - Internal Server Error:', error.message);
    } else {
      // Manejo de otros errores
      console.error('Error:', error.message);
    }

    // Propaga el error para que el suscriptor también lo maneje si es necesario
    return throwError('Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
  }

}

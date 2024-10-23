import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // URL da API para pedidos

  constructor(private http: HttpClient) {}

  // Método para obter a lista de pedidos
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Captura e trata possíveis erros da requisição HTTP
    );
  }

  // Método para criar um novo pedido
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter um pedido por ID
  getOrderById(id: number): Observable<Order> { // Atualizei o tipo de id para number
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Método para atualizar um pedido existente
  updateOrder(id: number, order: Order): Observable<Order> { // Atualizei o tipo de id para number
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Order>(url, order).pipe(
      catchError(this.handleError)
    );
  }

  // Método para deletar um pedido
  deleteOrder(id: number): Observable<void> { // Atualizei o tipo de id para number
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Método privado para tratar erros de requisição HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocorreu um erro:', error.message);
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}

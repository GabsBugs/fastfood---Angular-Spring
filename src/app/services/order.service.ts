import { Injectable } from '@angular/core'; // Importa o decorator Injectable para criar um serviço
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa o HttpClient e o HttpErrorResponse para requisições HTTP
import { Observable, throwError } from 'rxjs'; // Importa Observable e throwError para lidar com dados assíncronos e erros
import { catchError } from 'rxjs/operators'; // Importa o operador catchError para tratamento de erros
import { Order } from '../models/order.model'; // Importa a interface Order

@Injectable({
  providedIn: 'root' // Define que este serviço será disponibilizado globalmente na aplicação
})
export class OrderService {
  // URL da API para pedidos (pode ser substituída por uma URL real de API quando estiver disponível)
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Injeta o HttpClient para realizar chamadas HTTP
  constructor(private http: HttpClient) {}

  // Método para obter a lista de pedidos
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Captura e trata possíveis erros da requisição HTTP
    );
  }

  // Método para atualizar um pedido existente
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order).pipe(
      catchError(this.handleError) // Captura e trata possíveis erros da requisição HTTP
    );
  }

  // Método para cancelar um pedido (exclusão)
  cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`).pipe(
      catchError(this.handleError) // Captura e trata possíveis erros da requisição HTTP
    );
  }

  // Método privado para tratar erros de requisição HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Loga o erro no console para ajudar na depuração
    console.error('Ocorreu um erro:', error.message);
    // Retorna um erro customizado para ser exibido para o usuário
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}

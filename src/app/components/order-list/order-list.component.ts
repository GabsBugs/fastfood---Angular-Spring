import { Component, OnInit } from '@angular/core'; // Importa as classes necessárias do Angular
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model'; // Modelo de pedido (ajustado o caminho)
import { HttpErrorResponse } from '@angular/common/http'; // Para tratar erros HTTP
import { CommonModule } from '@angular/common'; // Importa CommonModule para acesso a pipes e diretivas básicas

@Component({
  selector: 'app-order-list', // Seletor do componente
  templateUrl: './order-list.component.html', // Caminho do template HTML
  styleUrls: ['./order-list.component.css'], // Caminho dos estilos CSS
  standalone: true, // Define o componente como standalone
  imports: [CommonModule], // Importa CommonModule para suporte a diretivas e pipes
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []; // Lista de pedidos inicializada como vazia

  constructor(private orderService: OrderService) { } // Injeta o serviço de pedidos

  ngOnInit(): void {
    this.loadOrders(); // Carrega os pedidos ao inicializar o componente
  }

  // Método privado para carregar pedidos utilizando o serviço de pedidos
  private loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data; // Atribui a resposta de pedidos à lista de pedidos
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar os pedidos:', error.message); // Loga o erro no console
      },
    });
  }

  // Método para cancelar um pedido utilizando o serviço de pedidos
  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.loadOrders(); // Atualiza a lista de pedidos após o cancelamento bem-sucedido
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Erro ao cancelar o pedido ${orderId}:`, error.message); // Loga o erro no console
      },
    });
  }
}

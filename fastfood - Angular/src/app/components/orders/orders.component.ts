import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, Item } from '../../models/order.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './orders.component.html', // Verifique se o nome está correto
  styleUrls: ['./orders.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[] = []; // Define orders como um @Input
  loading: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Carrega pedidos somente se não houver pedidos passados
    if (this.orders.length === 0) {
      this.loadOrders();
    }
  }

  private loadOrders(): void {
    this.loading = true; // Define o estado de carregamento
    this.orderService.getAllOrders().subscribe({
      next: (data: Order[]) => {
        // Mapeia os pedidos recebidos e calcula o total
        this.orders = data.map(order => ({
          ...order,
          totalAmount: this.calculateTotal(order.items),
        }));
        this.loading = false; // Atualiza o estado de carregamento
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar os pedidos:', error.message);
        this.loading = false; // Atualiza o estado de carregamento mesmo em caso de erro
      },
    });
  }

  private calculateTotal(items: Item[]): number {
    // Calcula o total dos itens de um pedido
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Método para visualizar detalhes de um pedido
  viewDetails(orderId: number | undefined): void {
    if (orderId !== undefined) {
      // Aqui você pode implementar a lógica para visualizar os detalhes do pedido
      console.log(`Visualizando detalhes do pedido: ${orderId}`);
      // Você pode redirecionar para uma página de detalhes ou abrir um modal, por exemplo
    } else {
      console.error('ID do pedido não definido');
    }
  }

  cancelOrder(orderId: number | undefined): void {
    // Cancela um pedido específico
    if (orderId !== undefined) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.loadOrders(); // Atualiza a lista após cancelamento
        },
        error: (error: HttpErrorResponse) => {
          console.error(`Erro ao cancelar o pedido ${orderId}:`, error.message);
        },
      });
    } else {
      console.error('ID do pedido não definido');
    }
  }
}

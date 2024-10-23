import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, Item } from '../../models/order.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []; // Lista de pedidos
  loading: boolean = false; // Propriedade para gerenciar o estado de carregamento

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(); // Carrega os pedidos ao inicializar
  }

  private loadOrders(): void {
    this.loading = true; // Inicia o carregamento
    this.orderService.getAllOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data.map(order => ({
          ...order,
          totalAmount: this.calculateTotal(order.items), // Calcula o total de cada pedido
        }));
        this.loading = false; // Finaliza o carregamento
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar os pedidos:', error.message);
        this.loading = false; // Finaliza o carregamento em caso de erro
      },
    });
  }

  // Método público para calcular o total dos itens de um pedido
  public calculateTotal(items: Item[]): number {
    if (!items || items.length === 0) {
      return 0; // Retorna 0 se não houver itens
    }

    // Calcula o total dos itens de um pedido
    return items.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 0); // Usa 0 se price ou quantity não estiverem definidos
    }, 0); // Inicia o total em 0
  }


}

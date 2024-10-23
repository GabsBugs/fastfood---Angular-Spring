import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  // Método para redirecionar para a página do pedido
  start(): void {
    const orderId = 1; // ID de exemplo, altere conforme necessário
    this.router.navigate(['/order-page', orderId]); // Redireciona para order-page com o ID do pedido
  }

  // Método para redirecionar para a lista de pedidos
  goToOrders(): void {
    this.router.navigate(['/orders']); // Redireciona para a página de pedidos
  }
}

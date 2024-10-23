import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  loading = false; // Propriedade para controlar o estado de carregamento
  orders: Order[] = []; // Array para armazenar os pedidos
  successMessage: string | null = null; // Propriedade para armazenar a mensagem de sucesso
  submitted: boolean = false; // Propriedade para rastrear se o formulário foi enviado

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required], // Campo para o nome do cliente
      items: this.fb.array([]), // Campo para a lista de itens
      addressId: ['', Validators.required], // Adicione o ID do endereço como um campo obrigatório
      orderDate: [new Date(), Validators.required], // Campo para a data do pedido
    });
  }

  ngOnInit(): void {
    this.addItem(); // Adiciona um item ao iniciar o componente
  }

  // Criando um item do pedido
  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, Validators.required] // Adicionei o campo price se ele for relevante
    });
  }

  // Método para adicionar item
  addItem(): void {
    (this.orderForm.get('items') as FormArray).push(this.createItem());
  }

  // Método para remover item
  removeItem(index: number): void {
    (this.orderForm.get('items') as FormArray).removeAt(index);
  }

  // Getter para os itens
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  onSubmit(): void {
    console.log('Submit function called'); // Log para verificar se a função é chamada
    this.submitted = true;

    if (this.orderForm.valid) {
      console.log('Form is valid');
      const newOrder: Order = this.orderForm.value; // Captura os dados do formulário
      console.log('Dados do novo pedido:', newOrder); // Loga os dados do novo pedido

      this.loading = true; // Define o estado de carregamento

      this.orderService.createOrder(newOrder).subscribe({
        next: (response) => {
          this.loading = false; // Limpa o estado de carregamento
          this.orders.push(response); // Adiciona o novo pedido ao array de pedidos
          this.successMessage = 'Pedido criado com sucesso!'; // Define a mensagem de sucesso
          this.snackBar.open(this.successMessage, 'Fechar', { duration: 3000 }); // Mensagem de sucesso
          this.orderForm.reset(); // Reseta o formulário após o envio
          this.submitted = false; // Reseta a propriedade submitted
          this.addItem(); // Adiciona um item vazio novamente
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false; // Limpa o estado de carregamento
          console.error('Erro ao criar o pedido:', error);

          // Verifique se há uma mensagem de erro retornada pela API
          const errorMessage = error.error?.message || 'Erro ao criar o pedido. Tente novamente.';
          this.snackBar.open(errorMessage, 'Fechar', { duration: 3000 }); // Mensagem de erro
        },
      });
    } else {
      console.error('Formulário inválido');
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', { duration: 3000 }); // Mensagem de erro
    }
  }
}

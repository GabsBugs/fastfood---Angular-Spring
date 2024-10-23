import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  standalone: true, // Adiciona a propriedade standalone
  imports: [ReactiveFormsModule],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup; // Declaração do formulário

  constructor(private fb: FormBuilder) {
    // Inicializa o formulário com campos e validações
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required], // Campo nome do cliente
      items: this.fb.array([]) // Inicializa como um FormArray
    });
  }

  ngOnInit(): void {
    this.addItem(); // Adiciona um item ao iniciar o componente
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray; // Acessa o FormArray de itens
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      itemName: ['', Validators.required], // Campo nome do item
      quantity: [1, [Validators.required, Validators.min(1)]] // Campo quantidade, com validações
    });
    this.items.push(itemGroup); // Adiciona o grupo de itens ao FormArray
  }

  removeItem(index: number): void {
    this.items.removeAt(index); // Remove item do FormArray pelo índice
  }

  onSubmit(): void {
    if (this.orderForm.valid) { // Verifica se o formulário é válido
      console.log('Order submitted:', this.orderForm.value); // Exibe os dados do formulário no console
      // Aqui você pode enviar o formulário para o serviço
    } else {
      console.error('Form is invalid'); // Log se o formulário for inválido
    }
  }
}

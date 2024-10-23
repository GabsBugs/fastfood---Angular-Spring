// Interface que representa um item de um pedido
export interface Item {
  productId: number;       // Identificador único do produto
  itemName: string;        // Nome do produto
  quantity: number;        // Quantidade do produto no pedido
  unitPrice: number;       // Preço unitário do produto
  totalPrice: number;      // Preço total para este item (unitPrice * quantity)
}

// Interface que representa um pedido
export interface Order {
  id: number;              // Identificador único do pedido
  items: Item[];           // Lista de itens no pedido
  totalAmount: number;     // Valor total do pedido (soma de totalPrice de cada item)
  orderDate: Date;         // Data em que o pedido foi realizado
  customerName: string;    // Nome do cliente que fez o pedido
  status: string;          // Status do pedido (e.g., "pending", "completed", "canceled")
  deliveryAddress?: string; // Endereço de entrega (opcional, caso aplicável)
  contactNumber?: string;  // Número de contato do cliente (opcional)
}

export interface OrderItem {
  id?: number;
  orderId: number; // ID do pedido
  itemId: number; // ID do item
  quantity: number;
}

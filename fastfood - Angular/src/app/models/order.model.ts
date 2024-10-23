export interface Item {
  itemName: string;
  quantity: number;
  price: number;
  productId?: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface Order {
  customerName: string;
  items: {
    itemName: string;
    quantity: number;
    price: number;
  }[];
  addressId: string;
  orderDate: Date;
}


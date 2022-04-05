export class OrderDTO{
  orderDate: string;
  amount: number;
  customerId: number;
  address: string;
  orderDetails: Array<{}>;
  orderStatus: Array<{}>;
}
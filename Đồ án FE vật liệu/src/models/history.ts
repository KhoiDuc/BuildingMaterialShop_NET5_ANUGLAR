export class HistoryDTO{
  orderId: number;
  orderDate: string;
  amount: number;
  customerId: number;
  address: string;
  customer: {};
  orderDetails: [{}];
  orderStatus: [{}];
}
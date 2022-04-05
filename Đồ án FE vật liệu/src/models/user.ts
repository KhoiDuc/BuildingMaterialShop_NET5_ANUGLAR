export class CustomerDTO{
  customerId: number;
  fullname: string;
  email: string;
  address: string;
  phoneNumber: string;
  passWord: string | Int32Array;
  gender: boolean;
  birthDay: string;
  isBlocked: boolean;
  orders: Object;
  refreshTokenCustomers: [];
}
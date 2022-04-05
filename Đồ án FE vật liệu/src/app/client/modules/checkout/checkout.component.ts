import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Cart } from '../../../../models/cart';
import { OrderDTO } from '../../../../models/order';
import { HttpService } from '../../../../services/client/http/http.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../services/client/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

  email: {
    email: null,
    name: null,
    id: null,
    address: null,
    phone: null
  };
  cart: Array<Cart> = [];
  total: number = 0;
  array: Array<{}> = [];
  trigger: boolean = false;
  private url: string = environment.NEW_API;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private alertify: AlertService,
  ) { }

  ngOnInit(): void {
    localStorage.setItem('breadcrumb', 'Thanh toán');
    this.getCustomer();
    this.getCart();
  }

  private getCustomer() {
    this.email = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('customer-email'), 'passwordEncrypt').toString(CryptoJS.enc.Utf8));
  }

  private getCart() {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    if (this.cart) {
      for (let i = 0; i < this.cart.length; i++){
        this.total += this.cart[i].total;
      }
    }
  }

  //STRIPE
  private invokeStripe():void {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = "text/javascript";
      script.src = "";
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {

  }
  //

  checkout() {
    this.trigger = true;
    for (let i = 0; i < this.cart.length; i++){
      let decoy = {
        quantity: this.cart[i].amount,
        productId: this.cart[i].productId
      };
      this.array.push(decoy);
    }
    let orders: OrderDTO = {
      orderDate: (new Date).toISOString(),
      amount: this.total,
      customerId: this.email.id,
      address: this.email.address,
      orderDetails: this.array,
      orderStatus: []
    };
    this.httpService.post(this.url, "Orders", orders).subscribe(
      data => {
        this.alertify.Success("Thanh toán thành công, xem thông tin tại lịch sử đặt hàng");
        setTimeout(() => {
          this.router.navigate(['/history']);
        }, 3000); //3s
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.alertify.Error('Thanh toán đã xảy ra lỗi');

      }
    );
  }

  backToCart() {
    this.router.navigate(['cart']);
  }

}

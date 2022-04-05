import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../../services/client/http/http.service';
import { Cart } from '../../../../models/cart';
import { Product } from '../../../../models/product';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',

})
export class CartComponent implements OnInit {

  product: Map<Product, Cart> = new Map();
  url: string = environment.NEW_API;
  total: number = 0;

  cart: Array<Cart> = [];
  public cart$ = new BehaviorSubject<number>(0);

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    localStorage.setItem('breadcrumb', 'Giỏ hàng');
    this.getItems();
  }

  increase(item) {
    if (this.product.size != 0) {
      let amount: Cart = this.product.get(item);
      amount.amount++;
      this.total += amount.price;

      amount.total = amount.amount * amount.price;
      this.product.set(item, amount);
    }
  }
  decrease(item) {
    if (this.product.size != 0) {
      let amount: Cart = this.product.get(item);
      amount.amount--;
      if (amount.amount < 1) {
        amount.amount = 1;
      }
      else {
        this.total -= amount.price;
      }
      amount.total = amount.amount * amount.price;
      this.product.set(item, amount);
    }
  }

  private getItems() {
    let email = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('customer-email'), 'passwordEncrypt').toString(CryptoJS.enc.Utf8));
    if (email != "undefined" && email) {
      this.updateCart();
    }
  }

  remove(id) {
    if (confirm("Bạn có chắc muốn gỡ sản phẩm này khỏi giỏ hàng của bạn ?")) {
      let a = this.cart.find(x => x.productId === id);
      let index = this.cart.indexOf(a);
      if (index != -1) {
        this.cart.splice(index, 1);
        console.log(this.cart);
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCart();
      }
    }
  }

  updateCart() {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    if (this.cart) {
      for (let i = 0; i < this.cart.length; i++){
        this.httpService.getUrl(this.url, "products/" + this.cart[i].productId).subscribe(data => {
          this.product.set(data, this.cart[i]);
          this.total += this.cart[i].total;
        });
      }
    }
  }

  updateCartAmount() {
    if (this.product.size != 0) {
      let array = Array<Cart>();
      this.product.forEach((value: Cart, key: any) => {
        array.push(value);
      });
      sessionStorage.setItem('cart', JSON.stringify(array));
    }
  }

}

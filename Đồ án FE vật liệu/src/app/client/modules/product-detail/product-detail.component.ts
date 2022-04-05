import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../../services/client/http/http.service';
import { Cart } from 'src/models/cart';
import { AlertService } from 'src/services/client/alert/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private alertify: AlertService
  ) { }

  product: any;
  amount: number = 0;

  cart: Array<Cart> = [];

  ngOnInit(): void {
    this.getProductDetail();
  }

  increase() {
    this.amount++;
  }
  decrease() {
    this.amount--;
    if (this.amount <= 0) {
      this.amount = 0;
    }
  }

  private getProductDetail() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.httpService.getUrl(environment.NEW_API, "Products/" + id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  AddToCart(name, productId, amount = 1, price = 0) {
    const value = sessionStorage.getItem('customer-email');
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    if (value && value != null) {
      if (cart && cart != undefined && cart != null) {
        this.cart = JSON.parse(sessionStorage.getItem('cart'));
        if (this.cart.find(x => x.productId === productId)) {
          let a = this.cart.find(x => x.productId === productId);
          let index = this.cart.indexOf(a);
  
          this.cart[index].amount += +amount;
          this.cart[index].total = this.cart[index].amount * price;
          sessionStorage.setItem('cart', JSON.stringify(this.cart));
        }
        else {
          let c = new Cart();
          c.productName = name;
          c.productId = productId;
          c.amount = +amount;
          c.price = price;
          c.total = c.amount * c.price;
          this.cart.push(c);
          sessionStorage.setItem('cart', JSON.stringify(this.cart));
        }
      }
      else {
        let c = new Cart();
        c.productName = name;
        c.productId = productId;
        c.amount = +amount;
        c.price = price;
        c.total = c.amount * c.price;
        this.cart.push(c);
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
      }
      this.alertify.Success("Thêm vào giỏ thành công");
    }
    else {
      this.alertify.Error("Bạn phải đăng nhập mới được thêm vào giỏ hàng");
    }
  }

}

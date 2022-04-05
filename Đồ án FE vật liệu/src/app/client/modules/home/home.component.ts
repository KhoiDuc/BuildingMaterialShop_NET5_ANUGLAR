import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../services/client/http/http.service';
import { Product } from '../../../../models/product';
import { environment } from 'src/environments/environment';
import { Cart } from '../../../../models/cart';
import { AlertService } from '../../../../services/client/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe'
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ NgbModalConfig, NgbModal ]
})
export class HomeComponent implements OnInit {
  ngUnsubscribe = new Subject<void>();
  ngUnsubscribeOnInit = new Subject<void>();
  products: Product[];
  product_detail: Product;
  amount: number = 0;
  categories: string;
  currentCategory: string;
  current: string = undefined;
  cart: Array<Cart> = [];

  private url: string = environment.NEW_API;

  totalRecords: Number;
  page: Number = 1;

  sortName: string = "price";
  sortCategory: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private alertify: AlertService,
    private modalService: NgbModal,
    private orderBy: OrderPipe
  ) {}

  ngOnInit(): void {
    localStorage.setItem('breadcrumb', "");
    this.activatedRoute.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe((qParams) => {
      this.current = qParams.current;
      console.log(this.current);
      this.initialize();
    });
  }
  initialize(): void {
    console.log(this.CheckCurrentCategory());
    this.getProduct(this.CheckCurrentCategory());
    this.getCategory();
  }
  open(content, product) {
    this.product_detail = product;
    this.modalService.open(content, { size: 'lg' });
  }

  private CheckCurrentCategory() {
    let value: string;
    this.activatedRoute.queryParams.subscribe(data => {
      value = data.current;
    })
    return value;
  }

  private getProduct(category?: string) {
    if (category) {
      this.httpService.getUrl(this.url, "Categories/" + category).subscribe(data => {
        this.products = data.products;
        this.currentCategory = data.categoryName;
        this.totalRecords = data.products.length;
      });
    }
    else {
      this.currentCategory = "";
      this.httpService.getUrl(this.url, "Products").subscribe(data => {
        this.products = data;
        this.totalRecords = data.length;
      });

    }
  }

  private getCategory() {
    this.httpService.getUrl(this.url, "Categories").subscribe(data => {
      this.categories = data;
    })
  }

  ProductDetail(product) {
    this.product_detail = product;
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

  AddToCart(name, productId, amount = 1, price = 0) {
    const value = sessionStorage.getItem('customer-email');
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    if (value && value != null) {
      if (cart && cart != undefined && cart != null) {
        this.cart = JSON.parse(sessionStorage.getItem('cart'));
        if (this.cart.find(x => x.productId === productId)) {
          let a = this.cart.find(x => x.productId === productId);
          let index = this.cart.indexOf(a);

          this.cart[index].amount += amount;
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

  sort(value) {
    this.sortName = value;
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribeOnInit.next();
    this.ngUnsubscribeOnInit.complete();
  }
}


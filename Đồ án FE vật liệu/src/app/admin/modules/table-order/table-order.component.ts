import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderDTO } from 'src/models/order';
import { HttpService } from 'src/services/admin/http/http.service';
import { AlertService } from 'src/services/client/alert/alert.service';

export interface OrderData{
  orderDate: string;
  amount: number;
  customerId: number;
  address: string;
  orderDetails: Array<{}>;
  orderStatus: Array<{}>;
}


@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['table-order.component.css']
})
export class TableOrderComponent implements OnInit {

  private url: string = environment.NEW_API;

  constructor(private httpService: HttpService, private alertService: AlertService) { }


  //INITAL VARIABLES
  display: string = 'none';
  orders: Array<OrderDTO> = [];
  orderDetails: OrderDTO;
  currentId: number;
  //

  ngOnInit(): void {
    this.getOrders();

  }

  private getOrders() {
    this.httpService.get(this.url, "Orders").subscribe(data => {
      this.orders = data;

    })
  }


  openModal(orderId) {
    this.display = 'block';
    this.currentId = orderId;
    this.httpService.get(this.url, "Orders/" + this.currentId).subscribe(data => {
      this.orderDetails = data;
    })
  }
  closeModal() {
    this.display = 'none';
    this.currentId = null;
    this.orderDetails = null;
  }

  cancleOrder(orderId) {
    if (confirm("Bạn có muốn huỷ đơn với mã đơn hàng: " + orderId + " không ?")) {
      this.httpService.post(this.url, "OrderStatus/DeleteOrderByEmployee/" + orderId, orderId).subscribe(
        data => {
          console.log(data);
          this.alertService.Success("Huỷ đơn hàng thành công");
          this.getOrders();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.alertService.Error("Có lỗi xảy ra với việc huỷ đơn hàng với mã" + orderId);
        }
      );
    }
  }

  confirmOrder(orderId) {
    if (confirm("Bạn có muốn xác nhận với mã đơn hàng: " + orderId + " không ?")) {
      this.httpService.post(this.url, "OrderStatus/ConfirmOrder/" + orderId, orderId).subscribe(
        data => {
          console.log(data);
          this.alertService.Success("Xác nhận đơn hàng thành công");
          this.getOrders();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.alertService.Error("Có lỗi xảy ra với việc xác nhận đơn hàng với mã" + orderId);
        }
      );
    }
  }

  deliveredOrder(orderId) {
    if (confirm("Bạn có muốn xác nhận với mã đơn hàng: " + orderId + " không ?")) {
      this.httpService.post(this.url, "OrderStatus/DeliveredOrder/" + orderId, orderId).subscribe(
        data => {
          console.log(data);
          this.alertService.Success("Xác nhận đơn hàng thành công");
          this.getOrders();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this.alertService.Error("Có lỗi xảy ra với việc xác nhận đơn hàng với mã" + orderId);
        }
      );
    }
  }

  getClassName(statusId) {
    if (statusId == 1) {
      return 'error-row';
    }
    if (statusId == 3) {
      return 'success-row';
    }
    if (statusId == 4) {
      return 'finish-row';
    }
    return '';
  }

}

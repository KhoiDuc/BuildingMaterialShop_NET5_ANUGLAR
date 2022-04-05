import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/services/admin/http/http.service';
import { AlertService } from 'src/services/client/alert/alert.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  private url: string = environment.NEW_API;

  constructor(private httpService: HttpService, private alertService: AlertService) { }

  //VARIABLES
  start: string = "2021-01-01";
  end: string = "2022-01-01";
  saleData = [];
  test: string = "2021-01-01";
  //

  ngOnInit(): void {
    this.httpService.get(this.url, "ThongKe/ThongKeDoanhThuTheoLoai?startDate=" +  this.start + "&endDate=" + this.end).subscribe(
      data => {
        this.saleData = JSON.parse(data);
      },
    );
  }


  dateButtonClick(startDate, endDate) {
    this.start = startDate;
    this.end = endDate;
    if (startDate && endDate) {
      if (startDate >= endDate) {
        this.alertService.Error("Ngày bắt đầu với ngày kết thúc không hợp lệ");
      }
      else {
        this.httpService.get(this.url, "ThongKe/ThongKeDoanhThuTheoLoai?startDate=" + this.start + "&endDate=" + this.end).subscribe(data => {
          this.saleData = JSON.parse(data);
          if (!this.saleData) {
            this.saleData = [{
              name: "",
              value: "",
            }]
          }
        });
      }

    }
  }

}

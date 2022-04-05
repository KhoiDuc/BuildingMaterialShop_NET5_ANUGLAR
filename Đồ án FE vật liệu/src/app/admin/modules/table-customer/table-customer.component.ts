import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { CustomerDTO } from 'src/models/user';
import { HttpService } from 'src/services/admin/http/http.service';
import { AlertService } from 'src/services/client/alert/alert.service';


@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['table-customer.component.css']
})
export class TableCustomerComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private datepipe: DatePipe,
    @Inject(DOCUMENT) private _document: Document
  ) {

    // Assign the data to the data source for the table to render
  }

  totalRecords: Number;
  itemsPerPage: number = 5;
  page: Number = 1;

  keyword: string = "";

  customers: Array<CustomerDTO> = [];
  display: string = 'none';
  currentCustomer: CustomerDTO;
  private url: string = environment.NEW_API;

  //FORM
  customerDetailForm: FormGroup;
  //

  ngOnInit(): void {
    this.getCustomerData();

  }

  private getCustomerData() {
    this.httpService.get(this.url, "Customers").subscribe(data => {
      this.customers = data;
      this.totalRecords = this.customers.length;
    });
  }

  private reloadPage() {
    this._document.defaultView.location.reload();
  }

  openModal(value) {
    this.display = 'block';
    this.currentCustomer = value;
    this.customerDetailForm = this.fb.group({
      customerId: new FormControl(value.customerId),
      fullName: new FormControl(value.fullName, [Validators.required]),
      email: new FormControl(value.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(value.address, [Validators.required]),
      phoneNumber: new FormControl(value.phoneNumber, [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
      gender: new FormControl(value.gender, [Validators.required]),
      birthDay: new FormControl(this.datepipe.transform(value.birthDay, 'yyyy-MM-dd'), [Validators.required]),
    });
  }
  closeModal() {
    this.display = 'none';
    this.currentCustomer = null;
  }


  customerBlockTrigger(customer) {
    if (confirm("Bạn có chắc chắn về quyết định của mình ?")) {
      if (!customer.isBlocked) {
        console.log("blocked");
        this.httpService.post(this.url, "Customers/Block", customer.customerId).subscribe(
          data => {
            console.log(data);
            this.alertService.Success("Chặn khách hàng với mã là" + customer.customerId + " thành công !");
            //this.reloadPage();
            this.getCustomerData();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            this.alertService.Error("Đã xảy ra lỗi với chức năng chặn");
          }
        );
      }
      else {
        this.httpService.post(this.url, "Customers/UnBlock", customer.customerId).subscribe(
          data => {
            this.alertService.Success("Gỡ chặn khách hàng với mã: " + customer.customerId + " thành công !");
            this.getCustomerData();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            this.alertService.Error("Đã xảy ra lỗi với chức năng gỡ chặn");
          }
        );
      }

    }
  }



}

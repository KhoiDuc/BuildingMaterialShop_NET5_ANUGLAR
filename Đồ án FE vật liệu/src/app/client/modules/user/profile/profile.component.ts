import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/services/admin/http/http.service';
import * as CryptoJS from 'crypto-js';
import { MustMatch } from '../../login/MustMatch';
import { AlertService } from 'src/services/client/alert/alert.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe, DOCUMENT } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { CustomerDTO } from 'src/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  private url: string = environment.NEW_API;

  changePasswordForm: FormGroup = this.fb.group(
    {
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmation: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
    {
      validator: MustMatch('newPassword', 'confirmation')
    }
  );

  currentCustomer: any;

  changeInformationForm: FormGroup;

  changePasswordError: string = "";

  ngOnInit(): void {
    this.getCurrentCustomer();
    let date = this.currentCustomer.birthDay;

    this.changeInformationForm = new FormGroup({
      customerId: new FormControl(this.currentCustomer.id),
      fullName: new FormControl(this.currentCustomer.name, [Validators.required]),
      email: new FormControl(this.currentCustomer.email, [Validators.required, Validators.minLength(8), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(this.currentCustomer.address, [Validators.required, Validators.minLength(10)]),
      phoneNumber: new FormControl(this.currentCustomer.phone, [Validators.required, Validators.minLength(10), Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
      gender: new FormControl(this.currentCustomer.gender, [Validators.required]),
      birthDay: new FormControl(this.datepipe.transform(date, 'yyyy-dd-MM'), [Validators.required]),
    });
    
  }

  reloadCurrentPage() {
    this._document.defaultView.location.reload();
  }

  private getCurrentCustomer() {
    const customer = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('customer-email'), 'passwordEncrypt').toString(CryptoJS.enc.Utf8));
    if (customer && customer.profileFlag == "true") {
      this.currentCustomer = customer;
    }
  }

  changePasswordSubmit(form) {
    let value = {
      customerId: this.currentCustomer.id,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmation
    };

    this.httpService.post(this.url, "Customers/ChangePassword", value).subscribe(
      data => {
        if (!data.error_message) {
          console.log(data);
          this.alertService.Success("Đã đổi mật khẩu thành công ! Bạn phải đăng nhập lại");
          sessionStorage.clear();
          //this.reloadCurrentPage();
        }
        else {
          this.changePasswordError = data.error_message;
        }
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  changeInformationSubmit(form) {
    let customer = {
      email: "",
      password: "",
      name: "",
      id: "",
      address: "",
      phone: "",
      birthDay: "",
      gender: "",
      profileFlag: ""
    };
    this.httpService.post(this.url, "Customers/ChangeInfo/" + this.currentCustomer.id, form).subscribe(
      data => {
        this.alertService.Success("Thay đổi thông tin đăng nhập thành công ! Đang thay đổi thông tin");
        this.setInformation(customer, form);
        this.reloadCurrentPage();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  private setInformation(customer, form) {
    customer.email = this.currentCustomer.email;
    customer.password = null;
    customer.name = form.fullName;
    customer.id = form.customerId;
    customer.address = form.address;
    customer.phone = form.phoneNumber;
    customer.gender = form.gender;
    console.log(form.gender);
    customer.birthDay = form.birthDay;
    customer.profileFlag = 'true';
    sessionStorage.setItem('customer-email', CryptoJS.AES.encrypt(JSON.stringify(customer), 'passwordEncrypt').toString());
    sessionStorage.setItem('customerName', customer.name);
    return customer;
  }

}

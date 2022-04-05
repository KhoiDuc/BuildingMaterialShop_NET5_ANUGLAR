import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { DatePipe, DOCUMENT } from '@angular/common';
import { EmployeeDTO } from 'src/models/employee';
import { HttpService } from 'src/services/admin/http/http.service';
import { environment } from 'src/environments/environment';
import { RoleDTO } from 'src/models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/services/client/alert/alert.service';
import { MustMatch } from 'src/app/client/modules/login/MustMatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private alertService: AlertService,
    @Inject(DOCUMENT) private _document: Document 
  ) { }

  

  profileForm: FormGroup;

  employee: EmployeeDTO;
  roles: RoleDTO;


  passwordForm: FormGroup;

  //API URL
  private url: string = environment.NEW_API;
  //

  ngOnInit(): void {
    this.getRoles();
    this.getProfile();
    this.passwordForm = this.fb.group(
      {
        employeeId: new FormControl(this.employee.employeeId),
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: MustMatch('newPassword', 'confirmPassword')  }
    );
    this.profileForm = this.fb.group({
      employeeId: new FormControl(this.employee.employeeId),
      fullName: new FormControl(this.employee.fullName, [Validators.required]),
      email: new FormControl(this.employee.email, [Validators.required, Validators.minLength(8), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(this.employee.address, [Validators.required]),
      phoneNumber: new FormControl(this.employee.phoneNumber, [Validators.required, Validators.minLength(10), Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
      gender: new FormControl(this.employee.gender),
      birthDay: new FormControl(this.datepipe.transform(this.employee.birthDay, 'yyyy-dd-MM'), [Validators.required]),
    });
  }

  private getRoles() {
    this.httpService.get(this.url, "Roles").subscribe(data => {
      this.roles = data;
    });
  }

  private getProfile() {
    let cipherText = sessionStorage.getItem('current-employee');
    if (cipherText) {
      this.employee = JSON.parse(CryptoJS.AES.decrypt(cipherText, 'secretkey').toString(CryptoJS.enc.Utf8));
    }
  }

  private reloadPage() {
    this._document.defaultView.location.reload();
  }

  passwordChangeSubmit(value) {
    if (confirm("Bạn chắc chắn có muốn thay đổi")) {
      this.httpService.post(this.url, "Employees/ChangePassword", value).subscribe(
        data => {
          this.alertService.Success("Đã thay đổi mật khẩu thành công !");
          sessionStorage.removeItem('employee-name');
          sessionStorage.removeItem('current-employee');
          sessionStorage.removeItem('admin');
          sessionStorage.removeItem('employee-refresh-token');
          this.reloadPage();
        },
        (error: HttpErrorResponse) => {
          console.log(error.headers);
          this.alertService.Error("Đã xảy ra lỗi trong quá trình đổi mật khẩu");
        }
      );
    }
  }

  private setProfile(value) {
    this.employee.fullName = value.fullName;
    this.employee.email = value.email;
    this.employee.address = value.address;
    this.employee.phoneNumber = value.phoneNumber;
    this.employee.gender = value.gender;
    this.employee.birthDay = value.birthDay;
    sessionStorage.setItem('current-employee', CryptoJS.AES.encrypt(JSON.stringify(this.employee), 'secretkey').toString());
  }

  profileSubmit(value) {
    this.httpService.post(this.url, "Employees/ChangeInfo/" + this.employee.employeeId, value).subscribe(
      data => {
        this.alertService.Success("Thay đổi thông tin cá nhân thành công !");
        this.setProfile(value);
        this.reloadPage();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.alertService.Error("Đã xảy ra trong quá trình truyền dữ liệu");
      }
    );
    console.log(value);
  }

  

}

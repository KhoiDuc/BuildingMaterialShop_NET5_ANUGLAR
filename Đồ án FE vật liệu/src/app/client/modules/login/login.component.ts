import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/header/header.service';
import { AuthService } from '../../../../services/client/auth/auth.service';
import { CustomerDTO } from '../../../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './MustMatch';
import * as CryptoJS from 'crypto-js';
import { AlertService } from 'src/services/client/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  user: CustomerDTO;
  loginError: string;
  signupError: string;
  error: string[];
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(8)]
    )
  });


  signupForm: FormGroup = this.fb.group(
    {
      firstname: new FormControl('', [Validators.required, Validators.minLength(7)]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      signup_password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      confirmation: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(15)]),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
    },
    {
      validator: MustMatch('signup_password', 'confirmation') 
    }
  );

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private headerService: HeaderService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.loginError = null;
  }

  loginOnSubmit(value): void{
    let emailJSON = {
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
    
    this.authService.login(value).subscribe(
      (data: any) => {
        if (data.accessToken) {
          sessionStorage.setItem('customer-token', data.accessToken);
          sessionStorage.setItem('customer-refresh-token', data.refreshToken);
          emailJSON = {
            email: data.email,
            password: data.passWord,
            name: data.fullName, 
            id: data.customerId,
            address: data.address,
            phone: data.phoneNumber,
            birthDay: data.birthDay,
            gender: data.gender,
            profileFlag: "true"
          }
          if (!emailJSON.id) {
            emailJSON = null;
          }
          sessionStorage.setItem('customer-email', CryptoJS.AES.encrypt(JSON.stringify(emailJSON), 'passwordEncrypt').toString());
          sessionStorage.setItem('customerName', emailJSON.name);
          this.headerService.userProfileSubject.next(data.fullName);
          this.router.navigate(['/']);
        }
        else {
          this.loginError = data;
        }
      },
      (error: HttpErrorResponse) => {
        this.loginError = error.message;
        console.log(error.message);
      }
    );
  }

  signupOnSubmit(value): void{
    //console.log(value);
    const body: CustomerDTO = {
      customerId: null,
      fullname: value.firstname + " " + value.lastname,
      email: value.email,
      address: value.address,
      phoneNumber: value.phonenumber,
      passWord: value.signup_password,
      gender: value.gender,
      birthDay: value.birthday,
      isBlocked: false,
      orders: null,
      refreshTokenCustomers: null
    }  
    this.authService.signup(body).subscribe(
      data => {
        //console.log(data);
        this.alertService.Success("Đăng kí thành công ! Bạn có thể đăng nhập");
      },
      (error: HttpErrorResponse) => {
        this.signupError = error.message;
      }
    );
  }

  checkPassword(password, confirmpassword) {
    if (password.value !== confirmpassword) {
      return false;
    }
    return true;
  }
}

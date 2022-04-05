import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/admin/auth/auth.service';
import * as crypto from 'crypto-js';
import { EmployeeDTO } from 'src/models/employee';
import { HeaderService } from 'src/services/admin/header/header.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private headerService: HeaderService, private router: Router) { }

  loginError: string;

  private url: string = environment.NEW_API;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ),
    passWord: new FormControl(
      '',
      [Validators.required, Validators.minLength(8)]
    )
  });

  ngOnInit(): void {
  }

  submit(value) {
    this.authService.login(value).subscribe(
      (data: any) => {
        if (data.accessToken) {
          sessionStorage.setItem('employee-refresh-token', data.refreshToken);
          sessionStorage.setItem('employee-token', data.accessToken);
          sessionStorage.setItem('employee-name', data.fullName);
          const str = JSON.stringify(data);
          sessionStorage.setItem( "current-employee", crypto.AES.encrypt(JSON.stringify(data), 'secretkey').toString() );
          this.headerService.userProfileSubject.next(data.fullName);
          this.router.navigate(['admin']);
        }
        else {
          this.loginError = data;
        }
        
      },
      (error: HttpErrorResponse) => {
        this.loginError = error.message;
      }
    );
  }

}

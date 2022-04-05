import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean;
  errorMessage: string;

  constructor(
    private http: HttpClient  
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  checkLogin(): boolean {
    const token = localStorage.getItem('customer-token');
    const refreshToken = localStorage.getItem('customer-refresh-token');
    if (!
      token || refreshToken ||
      token.length <= 12 || refreshToken.length <= 12
    ) {
      return this.isLogin = false;
    }
    else {
      return this.isLogin = true;
    }
  }

  signup(data) {
    const response = this.http.post(environment.NEW_API + 'Customers/Register', data, this.httpOptions);
    return response;
  }

  login(value): Observable<any> {
    const data = {
      email: value.email,
      password: Md5.hashStr(value.password)
    }
    
    return this.http.post(environment.NEW_API + 'Customers/Login', data, this.httpOptions);
  }
}

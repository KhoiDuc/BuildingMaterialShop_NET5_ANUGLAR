import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const refreshToken = sessionStorage.getItem('employee-refresh-token');
    const value = sessionStorage.getItem('current-employee');
    
    if (refreshToken && value) {
      const employeeData = JSON.parse(crypto.AES.decrypt(value, 'secretkey').toString(crypto.enc.Utf8));
      
      if (employeeData.roleId != 'ADMIN') {
        sessionStorage.setItem('employee', 'true');
        sessionStorage.removeItem('admin');
        return true;
      }
      else if (employeeData.roleId == 'ADMIN') {
        sessionStorage.setItem('admin', 'true');
        sessionStorage.removeItem('employee');
        return true;
      }
    }
    this.router.navigate(['admin/login']);
    return false;
  }
  
}

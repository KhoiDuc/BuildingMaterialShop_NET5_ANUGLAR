import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem('customer-token');
    const refreshToken = sessionStorage.getItem('customer-refresh-token');
    if (
      token && refreshToken &&
      token.length > 12 && refreshToken.length > 12
    ) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}

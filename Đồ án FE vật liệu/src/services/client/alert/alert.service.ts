import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private router: Router,
  ) { }
  
  Success(message: string) {
    let msg = alertify.success(message);
    msg.delay(3);
  }
  Warning(message: string) {
    let msg = alertify.warning(message);
    msg.delay(3);
  }
  Error(message: string) {
    let msg = alertify.error(message);
    msg.delay(3);
  }
}

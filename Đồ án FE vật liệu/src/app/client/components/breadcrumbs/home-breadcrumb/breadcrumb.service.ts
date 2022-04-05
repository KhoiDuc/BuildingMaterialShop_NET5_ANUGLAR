import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {

  breadcrumb = new BehaviorSubject(null);

  $subject = this.breadcrumb.asObservable();

  constructor() { }
}
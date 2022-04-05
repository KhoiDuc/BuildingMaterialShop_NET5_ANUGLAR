import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  userProfileSubject = new BehaviorSubject(null);

  $userProfile = this.userProfileSubject.asObservable();

  constructor() { }
}

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  keyword = '';
  name: string = "";
  type: string = "all";

  //INITAL VARIABLES
  display: boolean = false;
  display2: boolean = false;
  hamburgerTrigger: boolean = false;
  //

  constructor(
    private router: Router,
    private headerService: HeaderService,
  ) {
    // this.email = localStorage.getItem('customer-email');
    // if (this.email != null) {
    //   this.isLogin = true;
    // }

  }

  ngOnInit(): void {
    this.headerService.userProfileSubject.next(sessionStorage.getItem('customerName'));
    this.headerService.$userProfile.subscribe(res => {
        this.name = res;
    });
  }

  change(value) {
    this.type = value;
  }

  //CSS STYLE CHANGE SECTION
  styleChange() {
    this.hamburgerTrigger = !this.hamburgerTrigger;
    this.display = !this.display;
  }
  showItems() {
    this.display2 = !this.display2;
  }
  //
  

  onSubmit(): void {
    if (this.keyword == '' || !this.keyword) {
      this.router.navigate(['/Search']);
      return;
    }
    //this.router.navigate(['/Search?keyword=' + this.keyword + "&type=" + this.type])
    this.router.navigate(['/Search'], {
      queryParams: { keyword: this.keyword, type: this.type }
    });

    //keyword: this.keyword.split(' ').join('-')
  }

  logOut() {
    sessionStorage.removeItem('customer-email');
    sessionStorage.removeItem('customerName');
    sessionStorage.removeItem('customer-token');
    sessionStorage.removeItem('customer-refresh-token');
    this.name = "";
    //this.headerService.userProfileSubject = new BehaviorSubject(null);
    this.router.navigate(['']);
  }
}

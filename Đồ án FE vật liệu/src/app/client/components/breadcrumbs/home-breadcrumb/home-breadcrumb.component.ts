import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-home-breadcrumb',
  templateUrl: './home-breadcrumb.component.html',
})
export class HomeBreadcrumbComponent implements OnInit {

  public breadcrumb: string;

  constructor(private breadcrumbService: BreadCrumbService) { }

  ngOnInit(): void {
  }
  

  public setBreadCrumb(breadcrumb) {
    this.breadcrumb = breadcrumb;
  }

}

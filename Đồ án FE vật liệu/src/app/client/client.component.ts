import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})

export class ClientComponent implements OnInit{
  
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void{
    this.removeAdminTheme("../../assets/admin/css/bootstrap.min.css", "admin-bootstrap");
    this.removeAdminTheme("../../assets/admin/css/normalize.css", "admin-normalize");
    this.removeAdminTheme("../../assets/admin/css/jquery-jvectormap-2.0.3.css", "admin-jvectormap");
    this.removeAdminTheme("../../assets/admin/css/notika-custom-icon.css", "admin-notika-icon");
    this.removeAdminTheme("../../assets/admin/css/admin-main.css", "admin-main");
    this.removeAdminTheme("../../assets/admin/css/waves.min.css", "admin-waves");
    this.removeAdminTheme("../../assets/admin/css/button.css", "admin-button");
    this.removeAdminTheme("../../assets/admin/css/admin-style.css", "admin-style");
    this.removeAdminTheme("../../assets/admin/css/responsive.css", "admin-responsive");
    this.removeAdminTheme("../../assets/admin/css/meanmenu.css", "admin-meanmenu");

    this.loadStyle("client-style.css", "client-style");
    this.loadStyle("client-responsive.css", "client-responsive");
  }

  removeAdminTheme(styleName: string, id: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let adminTheme = this.document.getElementById(id) as HTMLLinkElement;
    if (adminTheme) {
      const style = this.document.createElement('link');
      style.id = id;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.removeChild(style);
    }
  }
  
  loadStyle(styleName: string, id: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let clientTheme = this.document.getElementById(id) as HTMLLinkElement;
    if (clientTheme) {
      clientTheme.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = id;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
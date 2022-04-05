import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit{
  constructor(@Inject(DOCUMENT) private document: Document) {
    
  }

  ngOnInit(): void{
    this.removeClientTheme("client-style.css", "client-style");
    this.removeClientTheme("client-responsive.css", "client-responsive");

    this.loadStyle("../../assets/admin/css/bootstrap.min.css", "admin-bootstrap"); //checked
    this.loadStyle("../../assets/admin/css/normalize.css", "admin-normalize"); //checked
    this.loadStyle("../../assets/admin/css/meanmenu.css", "admin-meanmenu"); //checked
    this.loadStyle("../../assets/admin/css/jquery-jvectormap-2.0.3.css", "admin-jvectormap");
    this.loadStyle("../../assets/admin/css/notika-custom-icon.css", "admin-notika-icon"); //checked
    this.loadStyle("../../assets/admin/css/admin-main.css", "admin-main"); //checked
    this.loadStyle("../../assets/admin/css/waves.min.css", "admin-waves"); //checked
    this.loadStyle("../../assets/admin/css/button.css", "admin-button"); //checked
    this.loadStyle("../../assets/admin/css/admin-style.css", "admin-style"); //checked
    this.loadStyle("../../assets/admin/css/responsive.css", "admin-responsive"); //checked
  }

  removeClientTheme(styleName: string, id: string) {
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
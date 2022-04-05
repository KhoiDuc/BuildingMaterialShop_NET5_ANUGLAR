import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { LoginComponent } from './modules/login/login.component';
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminMainModule } from "./modules/admin-main.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AdminMainModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    
  ],
  exports: [],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class AdminModule{

}
import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";

import { AdminMainComponent } from './admin-main.component';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { AuthGuard } from "../../../services/admin/auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { AdminMainRoutingModule } from "./admin-main-routing.module";
import { TableEmployeeComponent } from './table-employee/table-employee.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TableProductComponent } from './table-product/table-product.component';
import { StorageComponent } from './storage/storage.component';
import { TableOrderComponent } from './table-order/table-order.component';
import { TableCustomerComponent } from './table-customer/table-customer.component';
import { MatTableModule } from "@angular/material/table";
import { SearchTablePipe } from "src/services/admin/pipe/search-table.pipe";
import { ProfileComponent } from './profile/profile.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdbModule } from "mdb-angular-ui-kit";
import { DatepickerModule, WavesModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [
    AdminMainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TableEmployeeComponent,
    TableProductComponent,
    StorageComponent,
    TableOrderComponent,
    TableCustomerComponent,
    SearchTablePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AdminMainRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MdbModule,
    DatepickerModule,
    WavesModule,
  ],
  providers: [ HttpClientModule, AuthGuard, DatePipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class AdminMainModule{

}
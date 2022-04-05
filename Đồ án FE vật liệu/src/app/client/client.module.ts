import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { ClientRoutingModule } from "./client-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table';

import { ClientComponent } from "./client.component";
import { HomeBreadcrumbComponent } from "./components/breadcrumbs/home-breadcrumb/home-breadcrumb.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthGuard } from "../../services/client/auth/auth.guard";
import { CartComponent } from "./modules/cart/cart.component";
import { HomeComponent } from "./modules/home/home.component";
import { LoginComponent } from "./modules/login/login.component";
import { NotFoundComponent } from "./modules/not-found/not-found.component";
import { SearchComponent } from "./modules/search/search.component";
import { ProfileComponent } from "./modules/user/profile/profile.component";
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { HistoryComponent } from './modules/history/history.component';
import { CheckoutGuard } from "../../services/client/auth/checkout.guard";
import { OrderModule } from "ngx-order-pipe";

@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    HomeBreadcrumbComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    SearchComponent,
    LoginComponent,
    ProfileComponent,
    NotFoundComponent,
    ProductDetailComponent,
    CheckoutComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    OrderModule,
    
  ],
  providers: [
    HttpClientModule,
    AuthGuard,
    CheckoutGuard,
    DatePipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: []
})

export class ClientModule{

}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientComponent } from "./client.component";
import { AuthGuard } from "../../services/client/auth/auth.guard";
import { CheckoutGuard } from "../../services/client/auth/checkout.guard";
import { CartComponent } from "./modules/cart/cart.component";
import { CheckoutComponent } from "./modules/checkout/checkout.component";
import { HistoryComponent } from "./modules/history/history.component";
import { HomeComponent } from "./modules/home/home.component";
import { LoginComponent } from "./modules/login/login.component";
import { ProductDetailComponent } from "./modules/product-detail/product-detail.component";
import { SearchComponent } from "./modules/search/search.component";
import { ProfileComponent } from "./modules/user/profile/profile.component";

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'category', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'search', component: SearchComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, CheckoutGuard] },
      { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
      { path: "product/:id", component: ProductDetailComponent },
    ]
  },


];

@NgModule({
  imports: [ RouterModule.forChild(clientRoutes) ],
  exports: [ RouterModule ]
})

export class ClientRoutingModule{

}

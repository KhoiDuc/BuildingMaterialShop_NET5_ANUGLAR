import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/services/admin/auth/auth.guard";
import { AuthService } from "src/services/admin/auth/auth.service";
import { HomeComponent } from "../modules/home/home.component";
import { AdminMainComponent } from "./admin-main.component";
import { TableEmployeeComponent } from "./table-employee/table-employee.component";

const adminMainRoutes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthService] },
      { path: 'tableEmployee', component: TableEmployeeComponent }
    ]
  },
];


@NgModule({
  imports: [ RouterModule.forChild(adminMainRoutes) ],
  exports: [ RouterModule ]
})

export class AdminMainRoutingModule{
}
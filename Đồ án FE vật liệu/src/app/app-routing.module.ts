import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { NotFoundComponent } from './client/modules/not-found/not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ClientComponent },
  { path: 'admin', pathMatch: 'full', component: AdminComponent, outlet: 'admin '},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
    anchorScrolling: 'enabled',
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

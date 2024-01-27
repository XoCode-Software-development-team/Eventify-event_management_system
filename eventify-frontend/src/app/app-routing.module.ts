import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin-service/admin-service.component';

const routes: Routes = [
  {path:'', component: AdminServiceComponent},
  {path:'vendor/services/deleteRequests', component: AdminServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

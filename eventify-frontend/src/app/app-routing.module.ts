import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request/admin-delete-request.component';

const routes: Routes = [
  {path: 'admin/allServices', component: AdminServiceComponent},
  {path: 'admin/deleteRequests', component: AdminDeleteRequestComponent},
  {path: '', redirectTo: '/admin/allServices', pathMatch: 'full'},
  // {path: '**', component:}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin-service/admin-service.component';
import { AdminDeleteRequestComponent } from './Pages/admin-delete-request/admin-delete-request/admin-delete-request.component';

const routes: Routes = [
  {
    path: '',
    component: AdminServiceComponent,
  },
  {
    path: 'deleteRequests',
    component: AdminDeleteRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

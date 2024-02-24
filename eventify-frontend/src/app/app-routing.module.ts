import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request/admin-delete-request.component';
import { VendorServiceComponent } from './Pages/vendor/vendor-service/vendor-service.component';
import VendorBookedServicesComponent from './Pages/vendor/vendor-booked-services/vendor-booked-services.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceComponent } from './Pages/vendor/vendor-add-new-service/vendor-add-new-service.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { ClientServiceComponent } from './Pages/client/client-service/client-service.component';

const routes: Routes = [
  // {path: '', redirectTo: '/admin/allServices', pathMatch: 'full'},

  // {path: '**', component:},
  {
    path: 'client/allServices',
    component: ClientServiceComponent,
    children: [
      // {path: '',component: },
      // {path: '',component: }
    ]
  },
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    children: [
      {path: 'allServices',component: VendorServiceComponent},
      {path: 'bookedServices',component: VendorBookedServicesComponent},
      {path: 'bookingRequests',component: VendorBookingRequestsComponent},
      {path: 'addNewService',component: VendorAddNewServiceComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: 'allServices',component: AdminServiceComponent},
      {path: 'deleteRequests',component: AdminDeleteRequestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

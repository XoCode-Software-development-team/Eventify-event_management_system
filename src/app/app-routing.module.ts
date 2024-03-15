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
import { AllServiceComponent } from './Pages/common/all-service/all-service.component';
import { ServiceDetailsComponent } from './Pages/common/service-details/service-details.component';
import { HomeComponent } from './Pages/common/home/home.component';
import { CommonLayoutComponent } from './Pages/common/common-layout/common-layout.component';
import { LoginComponent } from './Pages/common/login/login.component';
import { ForgetPasswordComponent } from './Pages/common/forget-password/forget-password.component';

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  // {path: '**', component:},

  // {path: 'signUp'},
  {path: 'login', component:LoginComponent},
  {path: 'forgotPassword', component:ForgetPasswordComponent},


  {
    path:'',
    component:CommonLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component:HomeComponent},
      {path: 'services', component:AllServiceComponent},
      {path: 'service/1', component:ServiceDetailsComponent}
    ]
  },
  {
    path: 'AllServices',
    component: AllServiceComponent,
    children: [
      // {path: '',component: },
      // {path: '',component: }
    ]
  },
  {
    path: 'allServices/1',
    component: ServiceDetailsComponent,
    children: [
      // {path: '',component: },
      // {path: '',component: }
    ]
  },
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    children: [
      {path: '', redirectTo: 'allServices', pathMatch: 'full'},
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
      {path: '', redirectTo: 'allServices', pathMatch: 'full'},
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

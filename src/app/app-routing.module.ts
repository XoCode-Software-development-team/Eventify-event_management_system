import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request/admin-delete-request.component';
import { VendorServiceComponent } from './Pages/vendor/vendor-service/vendor-service.component';
import VendorBookedServicesComponent from './Pages/vendor/vendor-booked-services/vendor-booked-services.component';
import { AdminServiceAndResourceComponent } from './Pages/admin/admin-serviceAndResource/admin-serviceAndResource.component';
import { VendorServiceAndResourceComponent } from './Pages/vendor/vendor-serviceAndResource/vendor-serviceAndResource.component';
import VendorBookedServiceAndResourceComponent from './Pages/vendor/vendor-booked-serviceAndResource/vendor-booked-serviceAndResource.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceAndResourceComponent } from './Pages/vendor/vendor-add-new-serviceAndResource/vendor-add-new-serviceAndResource.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { AllServiceComponent } from './Pages/common/all-service/all-service.component';
import { ServiceDetailsComponent } from './Pages/common/service-details/service-details.component';
import { HomeComponent } from './Pages/common/home/home.component';
import { CommonLayoutComponent } from './Pages/common/common-layout/common-layout.component';
import { LoginComponent } from './Pages/common/login/login.component';
import { ForgetPasswordComponent } from './Pages/common/forget-password/forget-password.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import { EventComponent } from './Pages/client/event/event.component';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';

const routes: Routes = [
  {path: 'forgotPassword', component:ForgotPasswordComponent,canActivate:[AuthGuard]},
  {path: 'reset', component:ResetPasswordComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'forgotPassword', component:ForgetPasswordComponent},


  {
    path:'',
    component:CommonLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component:HomeComponent},
      {path: 'services', component:AllServiceComponent},
      {path: 'services/service/:soRId/:name', component:ServiceDetailsComponent}
    ]
  },
  {
    path:'client',
    component:ClientLayoutComponent,
    children: [
      {path: 'home', component:HomeComponent},
      {path: 'event', component:EventComponent, children: [
        { path: 'create', component: EventCreateFormComponent},
        { path: 'update/:id', component: EventCreateFormComponent },
        { path: 'view/:id', component: EventViewComponent },
        { path: '', redirectTo: '/create', pathMatch: 'full' },
      ]},
    ]
  },
  // {
  //   path: 'AllServices',
  //   component: AllServiceComponent,
  //   children: [
  //     // {path: '',component: },
  //     // {path: '',component: }
  //   ]
  // },
  // {
  //   path: 'allServices/service/:soRId/:name',
  //   component: ServiceDetailsComponent,
  //   children: [
  //     // {path: '',component: },
  //     // {path: '',component: }
  //   ]
  // },
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

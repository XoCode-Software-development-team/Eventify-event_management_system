import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceAndResourceComponent } from './Pages/admin/admin-serviceAndResource/admin-serviceAndResource.component';
import { VendorServiceAndResourceComponent } from './Pages/vendor/vendor-serviceAndResource/vendor-serviceAndResource.component';
import VendorBookedServiceAndResourceComponent from './Pages/vendor/vendor-booked-serviceAndResource/vendor-booked-serviceAndResource.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceAndResourceComponent } from './Pages/vendor/vendor-add-new-serviceAndResource/vendor-add-new-serviceAndResource.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { AllServiceAndResourceComponent } from './Pages/common/all-serviceAndResouce/all-serviceAndResource.component';
import { ServiceAndResourceDetailsComponent } from './Pages/common/serviceAndResource-details/serviceAndResource-details.component';
import { HomeComponent } from './Pages/common/home/home.component';
import { CommonLayoutComponent } from './Pages/common/common-layout/common-layout.component';
import { LoginComponent } from './Pages/common/login/login.component';
import { ForgetPasswordComponent } from './Pages/common/forget-password/forget-password.component';
import { VendorUpdateServiceAndResourceComponent } from './Pages/vendor/vendor-update-serviceAndResource/vendor-update-service.AndResourcecomponent';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';
import { ClientIconLayoutComponent } from './Pages/client/client-icon-layout/client-icon-layout.component';
import { AdminIconLayoutComponent } from './Pages/admin/admin-icon-layout/admin-icon-layout.component';
import { AdminSidenavLayoutComponent } from './Pages/admin/admin-sidenav-layout/admin-sidenav-layout.component';
import { VendorIconLayoutComponent } from './Pages/vendor/vendor-icon-layout/vendor-icon-layout.component';
import { VendorSidenavLayoutComponent } from './Pages/vendor/vendor-sidenav-layout/vendor-sidenav-layout.component';
import { CommonIconLayoutComponent } from './Pages/common/common-icon-layout/common-icon-layout.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request.component';
import { SignupComponent } from './Pages/common/signup/signup.component';

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  // {path: '**', component:},

  // {path: 'signUp'},
  {path: 'forgotPassword', component:ForgetPasswordComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {
    path:'',
    component:CommonLayoutComponent,
    children: [
      {path: 'home', component:HomeComponent},
      {path: '', component:CommonIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/home', pathMatch: 'full'},
          {path: 'services', component:AllServiceAndResourceComponent},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources', component:AllServiceAndResourceComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent}
        ]
      },
    ]
  },
  {
    path:'client',
    component:ClientLayoutComponent,
    children: [
      {path: '', component:ClientIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/client/home', pathMatch: 'full'},
          {path: 'services', component:AllServiceAndResourceComponent},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources', component:AllServiceAndResourceComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent}
        ]
      },
      {path: 'home', component:HomeComponent},
    ]
  },
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    children: [
      {path: 'home', component:HomeComponent},
      {path: '',component: VendorIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/vendor/home', pathMatch: 'full'},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: '',component: VendorSidenavLayoutComponent,
            children: [
              {path: 'services', redirectTo: 'services/all', pathMatch: 'full'},
              {path: 'resources', redirectTo: 'resources/all', pathMatch: 'full'},
              {path: 'services/all',component: VendorServiceAndResourceComponent},
              {path: 'services/bookedServices',component: VendorBookedServiceAndResourceComponent},
              {path: 'services/bookingRequests',component: VendorBookingRequestsComponent},
              {path: 'services/addNewService',component: VendorAddNewServiceAndResourceComponent},
              {path: 'services/updateService/:soRId/:name', component:VendorUpdateServiceAndResourceComponent},
              {path: 'resources/all',component: VendorServiceAndResourceComponent},
              {path: 'resources/bookedResources',component: VendorBookedServiceAndResourceComponent},
              {path: 'resources/bookingRequests',component: VendorBookingRequestsComponent},
              {path: 'resources/addNewResource',component: VendorAddNewServiceAndResourceComponent},
              {path: 'resources/updateResource/:soRId/:name', component:VendorUpdateServiceAndResourceComponent}
            ]
          },
        ]
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: 'home', component:HomeComponent},
      {path: '',component: AdminIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/admin/home', pathMatch: 'full'},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: '',component: AdminSidenavLayoutComponent,
            children: [
              {path: 'services', redirectTo: 'services/all', pathMatch: 'full'},
              {path: 'resources', redirectTo: 'resources/all', pathMatch: 'full'},
              {path: 'services/all',component: AdminServiceAndResourceComponent},
              {path: 'services/deleteRequests', component: AdminDeleteRequestComponent},
              {path: 'resources/all',component: AdminServiceAndResourceComponent},
              {path: 'resources/deleteRequests', component: AdminDeleteRequestComponent}
            ]
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

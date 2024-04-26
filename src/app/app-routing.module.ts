import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
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
import { VendorUpdateServiceComponent } from './Pages/vendor/vendor-update-service/vendor-update-service.component';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';
import { ClientIconLayoutComponent } from './Pages/client/client-icon-layout/client-icon-layout.component';
import { AdminIconLayoutComponent } from './Pages/admin/admin-icon-layout/admin-icon-layout.component';
import { AdminSidenavLayoutComponent } from './Pages/admin/admin-sidenav-layout/admin-sidenav-layout.component';
import { VendorIconLayoutComponent } from './Pages/vendor/vendor-icon-layout/vendor-icon-layout.component';
import { VendorSidenavLayoutComponent } from './Pages/vendor/vendor-sidenav-layout/vendor-sidenav-layout.component';
import { CommonIconLayoutComponent } from './Pages/common/common-icon-layout/common-icon-layout.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request.component';

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
      {path: '', component:CommonIconLayoutComponent,
        children: [
          {path: 'services', component:AllServiceComponent},
          {path: 'services/service/:soRId/:name', component:ServiceDetailsComponent}
        ]
      },
      {path: 'home', component:HomeComponent},
    ]
  },
  {
    path:'client',
    component:ClientLayoutComponent,
    children: [
      {path: '', component:ClientIconLayoutComponent,
        children: [
          {path: 'services', component:AllServiceComponent},
          {path: 'services/service/:soRId/:name', component:ServiceDetailsComponent}
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
          {path: 'services/service/:soRId/:name', component:ServiceDetailsComponent},
          {path: '',component: VendorSidenavLayoutComponent,
            children: [
              {path: 'services/all',component: VendorServiceComponent},
              {path: 'services/bookedServices',component: VendorBookedServicesComponent},
              {path: 'services/bookingRequests',component: VendorBookingRequestsComponent},
              {path: 'services/addNewService',component: VendorAddNewServiceComponent},
              {path: 'services/updateService/:soRId/:name', component:VendorUpdateServiceComponent},
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
          {path: 'services/service/:soRId/:name', component:ServiceDetailsComponent},
          {path: '',component: AdminSidenavLayoutComponent,
            children: [
              {path: 'services/all',component: AdminServiceComponent},
              {path: 'services/deleteRequests',component: AdminDeleteRequestComponent},
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

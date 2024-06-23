import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminServiceAndResourceComponent } from './Pages/admin/admin-serviceAndResource/admin-serviceAndResource.component';
import { VendorServiceAndResourceComponent } from './Pages/vendor/vendor-serviceAndResource/vendor-serviceAndResource.component';
import VendorBookedServiceAndResourceComponent from './Pages/vendor/vendor-booked-serviceAndResource/vendor-booked-serviceAndResource.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceAndResourceComponent } from './Pages/vendor/vendor-add-new-serviceAndResource/vendor-add-new-serviceAndResource.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { VendorUpdateServiceAndResourceComponent } from './Pages/vendor/vendor-update-serviceAndResource/vendor-update-service.AndResourcecomponent';
import { AdminIconLayoutComponent } from './Pages/admin/admin-icon-layout/admin-icon-layout.component';
import { AdminSidenavLayoutComponent } from './Pages/admin/admin-sidenav-layout/admin-sidenav-layout.component';
import { VendorIconLayoutComponent } from './Pages/vendor/vendor-icon-layout/vendor-icon-layout.component';
import { VendorSidenavLayoutComponent } from './Pages/vendor/vendor-sidenav-layout/vendor-sidenav-layout.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request.component';
import { ForgotPasswordComponent } from './Pages/client/forgot-password/forgot-password.component';
import { LoginComponent } from './Pages/client/login/login.component';
import { SignupComponent } from './Pages/client/signup/signup.component';
import { ClientIconLayoutComponent } from './Pages/client/client-icon-layout/client-icon-layout.component';
import { HomeComponent } from './Pages/client/home/home.component';
import { AllServiceAndResourceComponent } from './Pages/client/all-serviceAndResouce/all-serviceAndResource.component';
import { ServiceAndResourceDetailsComponent } from './Pages/client/serviceAndResource-details/serviceAndResource-details.component';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';
import { DashboardComponent } from './Pages/client/dashboard/dashboard.component';
import { AdminLoginComponent } from './Pages/admin/admin-login/admin-login.component';
import { VendorGuard } from './Guards/vendor.guard';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { ClientGuard } from './Guards/client.guard';
import { HomeGuard } from './Guards/home.guard';
import { ResetPasswordComponent } from './Pages/client/reset-password/reset-password.component';
import { EditProfileComponent } from './Pages/client/edit-profile/edit-profile.component';
import { EventComponent } from './Pages/client/event/event.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import { CompareViewComponent } from './Pages/client/compare-view/compare-view.component';
import { QueryParamsGuard } from './Guards/query-params.guard';
import { ChecklistComponent } from './Pages/client/checklist/checklist.component';
import { AgendaComponent } from './Pages/client/agenda/agenda.component';

const routes: Routes = [
  {path: 'forgotPassword', component:ForgotPasswordComponent,canActivate:[AuthGuard]},
  {path: 'reset', component:ResetPasswordComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent,canActivate:[AuthGuard]},
  {path: 'adminLogin',component: AdminLoginComponent,canActivate:[AuthGuard]},
  {path:'',component:ClientLayoutComponent,
    children: [
      {path: 'home', component:HomeComponent,canActivate:[HomeGuard]},
      {path: '', component:ClientIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/home', pathMatch: 'full'},
          {path: 'checklist', component:ChecklistComponent,canActivate:[AuthGuard]},
          {path: 'agenda',component:AgendaComponent,canActivate:[AuthGuard]},
          {path: 'event', component:EventComponent, 
            children: [
            { path: 'create', component: EventCreateFormComponent},
            { path: 'checklist', component: ChecklistComponent},
            { path: 'agenda', component: AgendaComponent},
            { path: 'update/:id', component: EventCreateFormComponent },
            { path: 'view/:id', component: EventViewComponent },
            { path: 'view/:id/checklist', component: ChecklistComponent },
            { path: 'view/:id/agenda', component: AgendaComponent },
            { path: '', redirectTo: 'create', pathMatch: 'full' },
          ],canActivate:[ClientGuard]},
          {path: 'dashboard', component:DashboardComponent},
          {path: 'services', component:AllServiceAndResourceComponent},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'services/compare', component:CompareViewComponent,canActivate:[QueryParamsGuard]},
          {path: 'resources', component:AllServiceAndResourceComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources/compare', component:CompareViewComponent,canActivate:[QueryParamsGuard]},
          {path: 'profile', component:EditProfileComponent,canActivate:[ClientGuard]},
          {path: 'password', component:EditProfileComponent,canActivate:[ClientGuard]}
        ]
      },
    ]
  },
  {path: 'vendor',component: VendorLayoutComponent,canActivate:[VendorGuard],
    children: [
      {path: 'home', component:HomeComponent},
      {path: '',component: VendorIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/vendor/home', pathMatch: 'full'},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'profile', component:EditProfileComponent,canActivate:[VendorGuard]},
          {path: 'password', component:EditProfileComponent,canActivate:[VendorGuard]},
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
              {path: 'resources/updateResource/:soRId/:name', component:VendorUpdateServiceAndResourceComponent},
            ]
          },
        ]
      },
    ]
  },
  {path: 'admin',component: AdminLayoutComponent,canActivate:[AdminGuard],
    children: [
      {path: 'home', component:HomeComponent},
      {path: '',component: AdminIconLayoutComponent,
        children: [
          {path: '', redirectTo: '/admin/home', pathMatch: 'full'},
          {path: 'services/service/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'resources/resource/:soRId/:name', component:ServiceAndResourceDetailsComponent},
          {path: 'profile', component:EditProfileComponent,canActivate:[AdminGuard]},
          {path: 'password', component:EditProfileComponent,canActivate:[AdminGuard]},
          {path: '',component: AdminSidenavLayoutComponent,
            children: [
              {path: 'services', redirectTo: 'services/all', pathMatch: 'full'},
              {path: 'resources', redirectTo: 'resources/all', pathMatch: 'full'},
              {path: 'services/all',component: AdminServiceAndResourceComponent},
              {path: 'services/deleteRequests', component: AdminDeleteRequestComponent},
              {path: 'resources/all',component: AdminServiceAndResourceComponent},
              {path: 'resources/deleteRequests', component: AdminDeleteRequestComponent},
            ]
          },
        ]
      },
    ]
  },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled',scrollPositionRestoration: 'enabled', scrollOffset:[0,170]})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

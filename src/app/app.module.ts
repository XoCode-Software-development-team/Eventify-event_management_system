import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminServiceAndResourceComponent } from './Pages/admin/admin-serviceAndResource/admin-serviceAndResource.component';
import { TabCardComponent } from './Components/tab-card/tab-card.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NavIconComponent } from './Components/nav-icon/nav-icon.component';
import { VendorServiceAndResourceComponent } from './Pages/vendor/vendor-serviceAndResource/vendor-serviceAndResource.component';
import { BasicButtonComponent } from './Components/buttons/basic-button/basic-button.component';
import VendorBookedServicesComponent from './Pages/vendor/vendor-booked-serviceAndResource/vendor-booked-serviceAndResource.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceAndResourceComponent } from './Pages/vendor/vendor-add-new-serviceAndResource/vendor-add-new-serviceAndResource.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PrimaryButtonComponent } from './Components/buttons/primary-button/primary-button.component';
import { SliderComponent } from './Components/slider/slider.component';
import { CategoryComponent } from './Components/category/category.component';
import { FilterRatingComponent } from './Components/filter-rating/filter-rating.component';
import { SortComponent } from './Components/sort/sort.component';
import { SearchComponent } from './Components/search/search.component';
import { ItemCardComponent } from './Components/item-card/item-card.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { SecondaryButtonComponent } from './Components/buttons/secondary-button/secondary-button.component';
import { ReviewCardComponent } from './Components/review-card/review-card.component';
import { NotificationBoxComponent } from './Components/notification-box/notification-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/client/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/client/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { VendorUpdateServiceAndResourceComponent } from './Pages/vendor/vendor-update-serviceAndResource/vendor-update-service.AndResourcecomponent';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';
import { ClientIconLayoutComponent } from './Pages/client/client-icon-layout/client-icon-layout.component';
import { AdminIconLayoutComponent } from './Pages/admin/admin-icon-layout/admin-icon-layout.component';
import { AdminSidenavLayoutComponent } from './Pages/admin/admin-sidenav-layout/admin-sidenav-layout.component';
import { VendorIconLayoutComponent } from './Pages/vendor/vendor-icon-layout/vendor-icon-layout.component';
import { VendorSidenavLayoutComponent } from './Pages/vendor/vendor-sidenav-layout/vendor-sidenav-layout.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request.component';
import { CapitalizePipe } from './Pipes/capitalize.pipe';
import { ToastComponent } from './Components/toast/toast.component';
import { TimeAgoPipe } from './Pipes/time-ago.pipe';
import { TruncatePipe } from './Pipes/truncate.pipe';
import { LoginCoverComponent } from './Components/login-cover/login-cover.component';
import { SignupComponent } from './Pages/client/signup/signup.component';
import { ForgotPasswordComponent } from './Pages/client/forgot-password/forgot-password.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { DashboardComponent } from './Pages/client/dashboard/dashboard.component';
import { AllServiceAndResourceComponent } from './Pages/client/all-serviceAndResouce/all-serviceAndResource.component';
import { ServiceAndResourceDetailsComponent } from './Pages/client/serviceAndResource-details/serviceAndResource-details.component';
import { AdminLoginComponent } from './Pages/admin/admin-login/admin-login.component';
import { ResetPasswordComponent } from './Pages/client/reset-password/reset-password.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { EditProfileComponent } from './Pages/client/edit-profile/edit-profile.component';
import { DeleteButtonComponent } from './Components/buttons/delete-button/delete-button.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import { EventComponent } from './Pages/client/event/event.component';
import { EventServiceResCardComponent } from './Components/event-service-res-card/event-service-res-card.component';
import { EventSideBarComponent } from './Components/event-side-bar/event-side-bar.component';
import { EventDialogComponent } from './Components/event-dialog/event-dialog.component';
import { CompareBoxComponent } from './Components/compare-box/compare-box.component';
import { CompareViewComponent } from './Pages/client/compare-view/compare-view.component';
import { ChecklistComponent } from './Pages/client/checklist/checklist.component';
import { AgendaComponent } from './Pages/client/agenda/agenda.component';
import { ToDoFormComponent } from './Components/to-do-form/to-do-form.component';
import { MaterialModule } from './Core/material.module';

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    AdminServiceAndResourceComponent,
    TabCardComponent,
    FooterComponent,
    NavIconComponent,
    VendorServiceAndResourceComponent,
    BasicButtonComponent,
    VendorBookedServicesComponent,
    VendorBookingRequestsComponent,
    VendorAddNewServiceAndResourceComponent,
    VendorLayoutComponent,
    AdminLayoutComponent,
    PrimaryButtonComponent,
    AllServiceAndResourceComponent,
    SliderComponent,
    CategoryComponent,
    FilterRatingComponent,
    SortComponent,
    SearchComponent,
    ItemCardComponent,
    ServiceAndResourceDetailsComponent,
    ImageViewComponent,
    SecondaryButtonComponent,
    ReviewCardComponent,
    NotificationBoxComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    VendorUpdateServiceAndResourceComponent,
    ClientLayoutComponent,
    ClientIconLayoutComponent,
    AdminIconLayoutComponent,
    AdminSidenavLayoutComponent,
    VendorIconLayoutComponent,
    VendorSidenavLayoutComponent,
    AdminDeleteRequestComponent,
    CapitalizePipe,
    ToastComponent,
    TimeAgoPipe,
    TruncatePipe,
    LoginCoverComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    AdminLoginComponent,
    ResetPasswordComponent,
    UserCardComponent,
    EditProfileComponent,
    DeleteButtonComponent,
    EventSideBarComponent,
    EventCreateFormComponent,
    EventViewComponent,
    EventServiceResCardComponent,
    EventComponent,
    EventDialogComponent,
    CompareBoxComponent,
    CompareViewComponent,
    ChecklistComponent,
    AgendaComponent,
    ToDoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

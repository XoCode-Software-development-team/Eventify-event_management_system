import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { MaterialModule } from './core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
import { TabCardComponent } from './Components/tab-card/tab-card.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NavIconComponent } from './Components/nav-icon/nav-icon.component';
import { VendorServiceComponent } from './Pages/vendor/vendor-service/vendor-service.component';
import { BasicButtonComponent } from './Components/buttons/basic-button/basic-button.component';
import VendorBookedServicesComponent from './Pages/vendor/vendor-booked-services/vendor-booked-services.component';
import { VendorBookingRequestsComponent } from './Pages/vendor/vendor-booking-requests/vendor-booking-requests.component';
import { VendorAddNewServiceComponent } from './Pages/vendor/vendor-add-new-service/vendor-add-new-service.component';
import { VendorLayoutComponent } from './Pages/vendor/vendor-layout/vendor-layout.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout/admin-layout.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PrimaryButtonComponent } from './Components/buttons/primary-button/primary-button.component';
import { AllServiceComponent } from './Pages/common/all-service/all-service.component';
import { SliderComponent } from './Components/slider/slider.component';
import { CategoryComponent } from './Components/category/category.component';
import { FilterRatingComponent } from './Components/filter-rating/filter-rating.component';
import { SortComponent } from './Components/sort/sort.component';
import { SearchComponent } from './Components/search/search.component';
import { ItemCardComponent } from './Components/item-card/item-card.component';
import { ServiceDetailsComponent } from './Pages/common/service-details/service-details.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { SecondaryButtonComponent } from './Components/buttons/secondary-button/secondary-button.component';
import { ReviewCardComponent } from './Components/review-card/review-card.component';
import { NotificationBoxComponent } from './Components/notification-box/notification-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './Pages/common/edit-profile/edit-profile.component';
import { LoginComponent } from './Pages/common/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/common/home/home.component';
import { CommonLayoutComponent } from './Pages/common/common-layout/common-layout.component';
import { ForgetPasswordComponent } from './Pages/common/forget-password/forget-password.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { VendorUpdateServiceComponent } from './Pages/vendor/vendor-update-service/vendor-update-service.component';
import { ClientLayoutComponent } from './Pages/client/client-layout/client-layout.component';
import { ClientIconLayoutComponent } from './Pages/client/client-icon-layout/client-icon-layout.component';
import { AdminIconLayoutComponent } from './Pages/admin/admin-icon-layout/admin-icon-layout.component';
import { AdminSidenavLayoutComponent } from './Pages/admin/admin-sidenav-layout/admin-sidenav-layout.component';
import { VendorIconLayoutComponent } from './Pages/vendor/vendor-icon-layout/vendor-icon-layout.component';
import { VendorSidenavLayoutComponent } from './Pages/vendor/vendor-sidenav-layout/vendor-sidenav-layout.component';
import { CommonIconLayoutComponent } from './Pages/common/common-icon-layout/common-icon-layout.component';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    AdminServiceComponent,
    TabCardComponent,
    FooterComponent,
    NavIconComponent,
    VendorServiceComponent,
    BasicButtonComponent,
    VendorBookedServicesComponent,
    VendorBookingRequestsComponent,
    VendorAddNewServiceComponent,
    VendorLayoutComponent,
    AdminLayoutComponent,
    PrimaryButtonComponent,
    AllServiceComponent,
    SliderComponent,
    CategoryComponent,
    FilterRatingComponent,
    SortComponent,
    SearchComponent,
    ItemCardComponent,
    ServiceDetailsComponent,
    ImageViewComponent,
    SecondaryButtonComponent,
    ReviewCardComponent,
    NotificationBoxComponent,
    EditProfileComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    CommonLayoutComponent,
    ForgetPasswordComponent,
    VendorUpdateServiceComponent,
    ClientLayoutComponent,
    ClientIconLayoutComponent,
    AdminIconLayoutComponent,
    AdminSidenavLayoutComponent,
    VendorIconLayoutComponent,
    VendorSidenavLayoutComponent,
    CommonIconLayoutComponent,
    AdminDeleteRequestComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

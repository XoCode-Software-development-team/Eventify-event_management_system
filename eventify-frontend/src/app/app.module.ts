import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { MaterialModule } from './core/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminServiceComponent } from './Pages/admin/admin-service/admin-service.component';
import { TabCardComponent } from './Components/tab-card/tab-card.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDeleteRequestComponent } from './Pages/admin/admin-delete-request/admin-delete-request/admin-delete-request.component';
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
import { ClientServiceComponent } from './Pages/client/client-service/client-service.component';
import { SliderComponent } from './Components/slider/slider.component';
import { CategoryComponent } from './Components/category/category.component';
import { FilterRatingComponent } from './Components/filter-rating/filter-rating.component';
import { SortComponent } from './Components/sort/sort.component';



@NgModule({
  declarations: [
    AppComponent,SideNavBarComponent, AdminServiceComponent, TabCardComponent, FooterComponent, AdminDeleteRequestComponent, NavIconComponent, VendorServiceComponent, BasicButtonComponent, VendorBookedServicesComponent, VendorBookingRequestsComponent, VendorAddNewServiceComponent, VendorLayoutComponent, AdminLayoutComponent, PrimaryButtonComponent, ClientServiceComponent, SliderComponent, CategoryComponent, FilterRatingComponent, SortComponent
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
      confirmButtonType: 'danger'
    }),
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

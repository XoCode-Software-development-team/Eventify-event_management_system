import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { MaterialModule } from './core/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminServiceComponent } from './Pages/admin-service/admin-service.component';
import { TabCardComponent } from './Components/tab-card/tab-card.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDeleteRequestComponent } from './Pages/admin-delete-request/admin-delete-request/admin-delete-request.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EventCoverComponent } from './Components/event-cover/event-cover.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EventCreateComponent } from './Pages/event-create/event-create.component';
import { EventViewComponent } from './Pages/event-view/event-view.component';

@NgModule({
  declarations: [
    AppComponent,SideNavBarComponent, AdminServiceComponent, TabCardComponent, FooterComponent, AdminDeleteRequestComponent
=======
    AppComponent,SideNavBarComponent, EventCoverComponent, EventCreateFormComponent, EventCreateComponent, EventViewComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
=======
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

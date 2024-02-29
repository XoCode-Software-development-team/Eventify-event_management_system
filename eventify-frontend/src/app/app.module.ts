import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { MaterialModule } from './core/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventCoverComponent } from './Components/event-cover/event-cover.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EventPageComponent } from './Pages/event-page/event-page.component';
import { EventServiceResCardComponent } from './Components/event-service-res-card/event-service-res-card.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';

import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  declarations: [
    AppComponent,SideNavBarComponent, AppComponent,SideNavBarComponent, EventCoverComponent,EventServiceResCardComponent,EventPageComponent,EventCreateFormComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxStarsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

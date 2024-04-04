import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Other
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PageEventComponent } from './Pages/Client/page-event/page-event.component';
import { NgxStarsModule } from 'ngx-stars';
//MAT
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { EventSideBarComponent } from './Components/event-side-bar/event-side-bar.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import {MatButtonModule} from '@angular/material/button';
import { EventServiceResCardComponent } from './Components/event-service-res-card/event-service-res-card.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    EventCreateFormComponent,
    PageEventComponent,
    EventSideBarComponent,
    EventViewComponent,
    EventServiceResCardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //MAT
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    //Other
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

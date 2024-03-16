import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Other
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PageEventComponent } from './Pages/page-event/page-event.component';
//MAT
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { EventSideBarComponent } from './Components/event-side-bar/event-side-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    EventCreateFormComponent,
    PageEventComponent,
    EventSideBarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //MAT
    MatIconModule,
    MatDividerModule,
    //Other
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

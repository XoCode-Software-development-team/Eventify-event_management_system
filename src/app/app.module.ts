import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SComponent } from './s/s.component';
import { ShowComparisonComponent } from './show-comparison/show-comparison.component';
import { ButtonComponent } from './button/button.component';
import { AddForCompareComponent } from './add-for-compare/add-for-compare.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { VendorService } from './Services/vendor.service';

@NgModule({
  declarations: [
    AppComponent,
    SComponent,
    ShowComparisonComponent,
    ButtonComponent,
    AddForCompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [VendorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

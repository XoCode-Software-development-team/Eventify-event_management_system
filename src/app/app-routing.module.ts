import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShowComparisonComponent } from './show-comparison/show-comparison.component';

const routes: Routes = [{path:  'show-comparison', component:  ShowComparisonComponent}];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

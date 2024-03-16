import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';
import { EventViewComponent } from './Components/event-view/event-view.component';

const routes: Routes = [
  { path: 'create', component: EventCreateFormComponent},
  { path: 'view/:id', component: EventViewComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

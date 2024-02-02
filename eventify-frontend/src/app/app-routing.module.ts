import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCoverComponent } from './Components/event-cover/event-cover.component';
import { EventCreateFormComponent } from './Components/event-create-form/event-create-form.component';

const routes: Routes = [
  { path: 'page1', component: EventCreateFormComponent },
  { path: 'page2', component: EventCoverComponent },
  { path: '', redirectTo: '/page1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

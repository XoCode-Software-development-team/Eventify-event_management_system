import { Component } from '@angular/core';

@Component({
  selector: 'app-event-cover',
  templateUrl: './event-cover.component.html',
  styleUrls: ['./event-cover.component.scss']
})
export class EventCoverComponent {
  viewAgenda() {
    console.log('View agenda!');
    //logic
  }
  viewChecklist() {
    console.log('View checklist!');
    //logic
  }
}

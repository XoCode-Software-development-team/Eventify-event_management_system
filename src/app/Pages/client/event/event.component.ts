import { Component } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  navbar = [
    {
      Tag: 'All Services',
      Url: 'allServices',
    },
    {
      Tag: 'Delete Requests',
      Url: 'deleteRequests',
    },
  ];

  icons = [
    {
      Name: 'compare',
      Url: '',
    },
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: 'notification',
    },
  ];

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-client-service',
  templateUrl: './client-service.component.html',
  styleUrls: ['./client-service.component.scss']
})
export class ClientServiceComponent {
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
      Url: '',
    },
  ];

  tasks = [
    {
      name: 'Catering',
      completed: false,
    },
    {
      name: 'Entertainment',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
    {
      name: 'Decoration',
      completed: false,
    },
  ];
}

import { Component } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent {
  constructor(private dialog:MatDialog) {}
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
      Url: 'popUpNotification()',
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

  popUpNotification() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
        top: '170px',
        left: '950px'
    };

    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Component({
  selector: 'app-client-icon-layout',
  templateUrl: './client-icon-layout.component.html',
  styleUrls: ['./client-icon-layout.component.scss']
})
export class ClientIconLayoutComponent {

  constructor(private dialog: MatDialog) {}

  // Array of icons to be displayed
  icons = [
    { Name: 'compare', Url: '' }, // Compare icon
    { Name: 'chat_bubble_outline', Url: '' }, // Chat icon
    { Name: 'notifications_none', Url: 'notification' } // Notification icon
  ];

  // Function to open notification dialog
  popUpNotification() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '170px', left: '950px' };
    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}

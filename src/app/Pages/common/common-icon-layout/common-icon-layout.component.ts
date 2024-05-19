import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Component({
  selector: 'app-common-icon-layout',
  templateUrl: './common-icon-layout.component.html',
  styleUrls: ['./common-icon-layout.component.scss'],
})
export class CommonIconLayoutComponent {
  constructor(private dialog: MatDialog) {}

  // Array containing icon data
  icons = [
    { Name: 'compare', Url: '',Badge: '' }, // Icon for comparison
    { Name: 'chat_bubble_outline', Url: '',Badge: '' }, // Icon for chat
    { Name: 'notifications_none', Url: 'notification',Badge: '5' }, // Icon for notifications
  ];

  // Open notification dialog
  popUpNotification() {
    const dialogConfig = new MatDialogConfig();

    // Set dialog position
    dialogConfig.position = { top: '170px', left: '950px' };

    // Open notification dialog
    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}

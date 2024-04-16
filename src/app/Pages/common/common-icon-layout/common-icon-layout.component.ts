import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Component({
  selector: 'app-common-icon-layout',
  templateUrl: './common-icon-layout.component.html',
  styleUrls: ['./common-icon-layout.component.scss']
})
export class CommonIconLayoutComponent {
  constructor(private dialog: MatDialog) {}

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

  popUpNotification() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '170px',
      left: '950px',
    };

    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}

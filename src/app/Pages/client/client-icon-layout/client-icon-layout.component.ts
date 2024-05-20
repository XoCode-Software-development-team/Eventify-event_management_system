import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { NotificationService } from 'src/app/Services/notification/notification.service';

@Component({
  selector: 'app-client-icon-layout',
  templateUrl: './client-icon-layout.component.html',
  styleUrls: ['./client-icon-layout.component.scss']
})
export class ClientIconLayoutComponent {

  constructor(private _notificationService: NotificationService) {}

  // Array containing icon data
  icons = [
    { IconName: 'compare', Tag: 'compare', Badge: '' }, // Icon for comparison
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: '' }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: '5' }, // Icon for notifications
  ];

  popUpNotification() {
    this._notificationService.openPopup();
  }

  // Function to check if the notification popup is toggled
  isNotificationToggled() {
    return this._notificationService.popupToggle;
  }
}

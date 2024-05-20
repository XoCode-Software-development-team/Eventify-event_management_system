import { Component } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification/notification.service';

@Component({
  selector: 'app-admin-icon-layout',
  templateUrl: './admin-icon-layout.component.html',
  styleUrls: ['./admin-icon-layout.component.scss']
})
export class AdminIconLayoutComponent {
  constructor(private _notificationService: NotificationService) {}

  // Array containing icon data
  icons = [
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

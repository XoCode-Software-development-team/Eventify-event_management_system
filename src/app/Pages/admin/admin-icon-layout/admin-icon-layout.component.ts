import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-admin-icon-layout',
  templateUrl: './admin-icon-layout.component.html',
  styleUrls: ['./admin-icon-layout.component.scss']
})
export class AdminIconLayoutComponent implements OnInit, OnDestroy {
  notificationBadgeSubscription: Subscription | undefined;

  constructor(private _notificationService: NotificationService, private _cdr: ChangeDetectorRef) {}

  // Array containing icon data
  icons = [
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  ngOnInit(): void {
     this.updateNotificationBadge(); 
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }
  }

  popUpNotification() {
    this._notificationService.openPopup();
  }

  // Function to check if the notification popup is toggled
  isNotificationToggled() {
    return this._notificationService.popupToggle;
  }

  updateNotificationBadge() {
    // Subscribe to the notification badge count
    this.notificationBadgeSubscription =
      this._notificationService.notificationBadge$.subscribe(
        (count: number) => {
          this._cdr.detectChanges(); // Manually trigger change detection
          // this.icons[1].Badge = count;
          const notificationIcon = this.icons.find(icon => icon.Tag === 'notification');
          notificationIcon!.Badge = count;
        }
      );
  }
}

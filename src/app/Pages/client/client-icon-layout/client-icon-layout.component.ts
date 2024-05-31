import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-icon-layout',
  templateUrl: './client-icon-layout.component.html',
  styleUrls: ['./client-icon-layout.component.scss'],
})
export class ClientIconLayoutComponent implements OnInit, OnDestroy {
  notificationBadgeSubscription: Subscription | undefined;

  // Array containing icon data
  icons = [
    { IconName: 'compare', Tag: 'compare', Badge: 0 }, // Icon for comparison
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateNotificationBadge();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }
  }

  updateNotificationBadge() {
    // Subscribe to the notification badge count
    this.notificationBadgeSubscription =
      this._notificationService.notificationBadge$.subscribe(
        (count: number) => {
          this._cdr.detectChanges(); // Manually trigger change detection
          this.icons[2].Badge = count;
        }
      );
  }

  popUpNotification() {
    this._notificationService.openPopup();
  }

  // Function to check if the notification popup is toggled
  isNotificationToggled() {
    return this._notificationService.popupToggle;
  }
}

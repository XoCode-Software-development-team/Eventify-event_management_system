import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { Subscription, filter, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-client-icon-layout',
  templateUrl: './client-icon-layout.component.html',
  styleUrls: ['./client-icon-layout.component.scss'],
})
export class ClientIconLayoutComponent implements OnInit, OnDestroy {
  notificationBadgeSubscription: Subscription | undefined;
  private routerSubscription!: Subscription;

  // Array containing icon data
  icons = [
    { IconName: 'compare', Tag: 'compare', Badge: 0 }, // Icon for comparison
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.updateNotificationBadge();
    this.hideCompareButton();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  routerSubscribe() {
    this.routerSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideCompareButton();
      }
    });
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

  hideCompareButton() {
    let currentUrl = this._router.url;

    if (currentUrl === '/profile' || currentUrl === '/password' || currentUrl.startsWith('/event')) {
      // Hide button if the URL is exactly '/vendor/updateProfile' or '/vendor/updatePassword'
      this.icons = this.icons.filter((icon) => icon.IconName !== 'compare');
    } else {
      // Add back the "compare" button if the URL doesn't match '/vendor/updateProfile' or '/vendor/updatePassword'
      const compareButtonExists = this.icons.some(
        (icon) => icon.IconName === 'compare'
      );
      if (!compareButtonExists) {
        this.icons.push({ IconName: 'compare', Tag: 'compare', Badge: 0 });
      }
    }
  }
}

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-admin-icon-layout',
  templateUrl: './admin-icon-layout.component.html',
  styleUrls: ['./admin-icon-layout.component.scss']
})
export class AdminIconLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  notificationBadgeSubscription: Subscription | undefined;
  private notificationClosedSubscription!:Subscription;

  popUpItem: string = '';


  constructor(private _notificationService: NotificationService, private _cdr: ChangeDetectorRef) {}

  // Array containing icon data
  icons = [
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  ngOnInit(): void {
     this.updateNotificationBadge(); 
  }

  ngAfterViewInit(): void {
    this.notificationClosedSubscribe();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }
  }

  notificationClosedSubscribe() {
    this.notificationClosedSubscription = this._notificationService.notificationClosed$.subscribe(() => {
      this.popUpItem = '';
    });
  }

  popUp(item: string) {
    if (item === 'notification') {
      this.popUpItem = item;
      this._notificationService.openPopup();
    } else if (item === 'compare') {
      this.popUpItem = '';
    } else if (item === 'chat') {
      const chatUrl = 'https://wa.me/';
      window.open(chatUrl, '_blank'); // Opens WhatsApp Web in a new tab      
      this.popUpItem = '';
    }
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

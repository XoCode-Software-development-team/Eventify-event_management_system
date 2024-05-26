import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { NotificationService } from 'src/app/Services/notification/notification.service';
import { Notification } from 'src/app/Interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  notifications: Notification[] = [];
  notificationBadgeSubscription: Subscription | undefined;
  unreadCount: number = 0;
  userId = 'a0e3d4f5-8d53-4fb1-b36d-7316a31a4a41';
  pageNumber = 1;
  pageSize = 10;
  loading = false;
  noMoreNotifications = false;

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._notificationService.notificationBadge$.subscribe((unreadCount) => {
      this.unreadCount = unreadCount;
    });
    console.log(this.unreadCount);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !this.loading &&
          !this.noMoreNotifications
        ) {
          this.loadMoreNotifications();
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    observer.observe(this.scrollAnchor.nativeElement);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }
  }

  getNotifications() {
    this.loading = true;
    if (this.notifications.length == 0) this.pageNumber = 1;
    this._notificationService
      .getNotifications(this.userId, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: any) => {
          if (res.length < this.pageSize) {
            this.noMoreNotifications = true;
          }
          this.notifications = [...this.notifications, ...res];
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
        },
      });
    this.updateNotificationBadge();
  }

  loadMoreNotifications() {
    this.pageNumber++;
    this.getNotifications();
  }

  updateNotificationBadge() {
    // Subscribe to the notification badge count
    this.notificationBadgeSubscription =
      this._notificationService.notificationBadge$.subscribe(
        (count: number) => {
          this._cdr.detectChanges(); // Manually trigger change detection
          this.unreadCount = count;
        }
      );
  }

  clickNotification(notification: Notification) {
    this._notificationService
      .markAsRead(this.userId, notification.notificationId)
      .subscribe({
        next: (res: any) => {
          notification.read = true;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  markAllRead() {
    this.notifications.forEach((notification) => (notification.read = true));
  }

  clearAll() {
    this.notifications = [];
    this.unreadCount = 0;
    this.updateNotificationBadge();
  }
}

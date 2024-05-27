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
  notificationUpdateSubscription: Subscription | undefined;
  unreadCount: number = 0;
  userId = 'a0e3d4f5-8d53-4fb1-b36d-7316a31a4a41';
  pageNumber = 1;
  pageSize = 10;
  loading = false;
  noMoreNotifications = false;
  isLoading: boolean = false;
  clickedNotification: number = 0;
  allLoading: boolean = false;

  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._notificationService.notificationBadge$.subscribe((unreadCount) => {
      this.unreadCount = unreadCount;
    });

    this.notificationUpdateSubscription = this._notificationService.notificationUpdates$.subscribe(
      (newNotification) => {
        this.notifications.unshift(newNotification); // Add new notification to the top of the list
        this._cdr.detectChanges();
      }
    );

    this.getNotifications();
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
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }

    if (this.notificationUpdateSubscription) {
      this.notificationUpdateSubscription.unsubscribe();
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
    this.notificationBadgeSubscription =
      this._notificationService.notificationBadge$.subscribe(
        (count: number) => {
          this._cdr.detectChanges();
          this.unreadCount = count;
        }
      );
  }

  clickNotification(notification: Notification) {
    if (this.clickedNotification == notification.notificationId) {
      this.clickedNotification = 0;
    } else {
      this.clickedNotification = notification.notificationId;
    }
    if (notification.read) return;
    this.isLoading = true;
    this._notificationService
      .markAsRead(this.userId, notification.notificationId)
      .subscribe({
        next: (res: any) => {
          notification.read = true;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }

  markAllRead() {
    if (this.unreadCount == 0) return;
    this.allLoading = true;
    this._notificationService.markAllRead(this.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.notifications.forEach((notification) => (notification.read = true));
        this.allLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.allLoading = false;
      },
    });
  }

  clearAll() {
    if (this.notifications.length == 0) return;
    this.allLoading = true;
    this._notificationService.clearAll(this.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.notifications = [];
        this.updateNotificationBadge();
        this.allLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.allLoading = false;
      },
    });
  }

  deleteNotification(notificationId: number) {
    this.isLoading = true;
    this._notificationService
      .deleteNotification(this.userId, notificationId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.notifications = this.notifications.filter(
            (n) => n.notificationId !== notificationId
          );
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { NotificationService } from 'src/app/Services/notification.service';
import { Subscription, filter, startWith } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { CompareBoxComponent } from 'src/app/Components/compare-box/compare-box.component';
import { CompareService } from 'src/app/Services/compare.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';

@Component({
  selector: 'app-client-icon-layout',
  templateUrl: './client-icon-layout.component.html',
  styleUrls: ['./client-icon-layout.component.scss'],
})
export class ClientIconLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  notificationBadgeSubscription: Subscription | undefined;
  compareBadgeSubscription:Subscription | undefined;
  private routerSubscription!: Subscription;
  private notificationClosedSubscription!:Subscription;
  private dialogRef: MatDialogRef<CompareBoxComponent> | null = null;
  popUpItem: string = '';

  // Array containing icon data
  icons = [
    { IconName: 'compare', Tag: 'compare', Badge: 0 }, // Icon for comparison
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _matDialog: MatDialog,
    private _compare: CompareService,
    private _serviceAndResource: ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    this.updateNotificationBadge();
    this.routerSubscribe();
    this.hideCompareButton();
  }

  ngAfterViewInit(): void {
      this.updateCompareBadge();
      this.notificationClosedSubscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.notificationBadgeSubscription) {
      this.notificationBadgeSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if(this.compareBadgeSubscription) {
      this.compareBadgeSubscription.unsubscribe();
    }

    if(this.notificationClosedSubscription) {
      this.notificationClosedSubscription.unsubscribe();
    }
  }

  routerSubscribe() {
    this.routerSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideCompareButton();
        this.updateCompareBadge();
      }
    });
  }

  notificationClosedSubscribe() {
    this.notificationClosedSubscription = this._notificationService.notificationClosed$.subscribe(() => {
      this.popUpItem = '';
    });
  }

  updateNotificationBadge() {
    // Subscribe to the notification badge count
    this.notificationBadgeSubscription =
      this._notificationService.notificationBadge$.subscribe((count: any) => {
        this._cdr.detectChanges(); // Manually trigger change detection
        const notificationIcon = this.icons.find(
          (icon) => icon.Tag === 'notification'
        );
        notificationIcon!.Badge = count;
        // this.icons[2].Badge = count;
      });
  }

  updateCompareBadge() {
    // Subscribe to the compare badge count
    this.compareBadgeSubscription = this._compare.compareBadge$.subscribe((val:any) => {
      const compareIcon = this.icons.find((icon) => icon.Tag === 'compare');
      if (compareIcon) {
        if (this._serviceAndResource.checkUrlString() === 'service') {
        compareIcon.Badge = val.serviceCount;
        } else {
          compareIcon.Badge = val.resourceCount;
        }
      }
      this._cdr.detectChanges(); // Manually trigger change detection
    });
  }

  popUp(item: string) {
    if (item === 'notification') {
      this.popUpItem = item;
      this._notificationService.openPopup();
    } else if (item === 'compare') {
      this.openComparePopUp();
      this.popUpItem = item;
    } else if (item === 'chat') {
      const chatUrl = 'https://wa.me/';
      window.open(chatUrl, '_blank'); // Opens WhatsApp Web in a new tab      
      this.popUpItem = '';
    }
  }

  hideCompareButton() {
    let currentUrl = this._router.url;

    if (
      currentUrl === '/profile' ||
      currentUrl === '/password' || currentUrl === '/dashboard' || currentUrl === '/checklist' || currentUrl === '/agenda' || currentUrl === '/userGuide' ||
      currentUrl.startsWith('/event')
    ) {
      // Hide button if the URL is exactly '/vendor/updateProfile' or '/vendor/updatePassword'
      this.icons = this.icons.filter((icon) => icon.IconName !== 'compare');
    } else {
      // Add back the "compare" button if the URL doesn't match '/vendor/updateProfile' or '/vendor/updatePassword'
      const compareButtonExists = this.icons.some(
        (icon) => icon.IconName === 'compare'
      );
      if (!compareButtonExists) {
        this.icons.unshift({ IconName: 'compare', Tag: 'compare', Badge: 0 });
      }
    }
  }

  openComparePopUp() {
    if (this.popUpItem != 'compare') {
      this.dialogRef = this._matDialog.open(CompareBoxComponent, {
        width: '425px',
        height: '45%',
        position: { top: '165px', right: '130px' },
      });
      this.popUpItem = 'compare';

      this.dialogRef.afterClosed().subscribe(() => {
        this.popUpItem = '';
      });
    } else {
      this.dialogRef?.close();
      this.popUpItem = '';
    }
  }
}

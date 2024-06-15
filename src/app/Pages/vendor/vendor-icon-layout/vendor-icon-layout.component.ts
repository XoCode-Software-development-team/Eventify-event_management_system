import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { NotificationService } from 'src/app/Services/notification.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';

@Component({
  selector: 'app-vendor-icon-layout',
  templateUrl: './vendor-icon-layout.component.html',
  styleUrls: ['./vendor-icon-layout.component.scss'],
})
export class VendorIconLayoutComponent implements OnInit, OnDestroy {
  notificationBadgeSubscription: Subscription | undefined;
  private routerSubscription!: Subscription;
  soRId: string = '';
  name: string = '';
  buttonToggle: boolean = false;
  

  // Array containing icon data
  icons = [
    { IconName: 'chat_bubble_outline', Tag: 'chat', Badge: 0 }, // Icon for chat
    { IconName: 'notifications_none', Tag: 'notification', Badge: 0 }, // Icon for notifications
  ];

  capitalizedTag = ''; // Initial empty string

  button: Button = {
    icon: 'add',
    text: '',
    url: '',
    class: ['btn1'],
    iconClass: [],
    type: 'button',
    disable: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService,
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Call the changeButton method to update the button value
        this.changeButton();
      }
    });
    this.changeButton(); // Initial call to changeButton
    this.updateNotificationBadge();
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

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

  changeButton() {
    // Get the current URL
    const currentUrl = this.router.url;
    // Update the capitalizedTag
    this.capitalizedTag = this.capitalizeText(this.checkUrlString());
    // Define the base URL without parameters
    const baseUrlWithoutParams = `/vendor/${this.checkUrlString()}s/update${
      this.capitalizedTag
    }/`;
    // Define URLs to exclude
    const excludedUrls = [`/vendor/${this.capitalizedTag}s/all`];

    // Reset button properties to default values
    this.button.icon = 'add';
    this.button.text = `Add New ${this.capitalizedTag}`;
    this.button.url = `${this.checkUrlString()}s/addNew${this.capitalizedTag}`;
    this.button.disable = false;
    this.button.class = ['btn1'];

    // Check if the current URL starts with the base URL without parameters
    if (
      currentUrl.startsWith(baseUrlWithoutParams) &&
      !excludedUrls.includes(currentUrl)
    ) {
      // If it matches and not in excluded URLs, set the button properties
      this.button.icon = 'update';
      this.button.text = `Update ${this.capitalizedTag}`;
      this.button.url = currentUrl;
      this.button.class = ['btn1', 'update-btn'];
      this.button.disable = true;
    } else if (
      currentUrl.startsWith(
        `/vendor/${this.checkUrlString()}s/${this.checkUrlString()}/`
      ) &&
      !excludedUrls.includes(currentUrl)
    ) {
      // Hide button for specific URLs
      this.button.class = ['hideButton'];
    } else if (
      currentUrl === '/vendor/profile' ||
      currentUrl === '/vendor/password'
    ) {
      // Hide button if the URL is exactly 'http://localhost:4200/vendor/updateProfile'
      this.button.class = ['hideButton'];
    }
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }

  // Capitalize the text using the custom pipe
  capitalizeText(value: string): string {
    return new CapitalizePipe().transform(value);
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-icon-layout',
  templateUrl: './vendor-icon-layout.component.html',
  styleUrls: ['./vendor-icon-layout.component.scss']
})
export class VendorIconLayoutComponent implements OnInit, OnDestroy {

  private routerSubscription!: Subscription;
  soRId: string = '';
  name: string = '';
  buttonToggle: boolean = false;

  icons = [
    {
      Name: 'chat_bubble_outline', // Chat icon
      Url: '',
    },
    {
      Name: 'notifications_none', // Notification icon
      Url: '',
    }
  ];

  capitalizedTag = ''; // Initial empty string

  button: Button = {
    icon: 'add',
    text: '',
    url: '',
    class: ['btn1'],
    type: 'button',
    disable: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Call the changeButton method to update the button value
        this.changeButton();
      }
    });
    this.changeButton(); // Initial call to changeButton
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  changeButton() {
    // Get the current URL
    const currentUrl = this.router.url;
    // Update the capitalizedTag
    this.capitalizedTag = this.capitalizeText(this.checkUrlString());
    // Define the base URL without parameters
    const baseUrlWithoutParams = `/vendor/${this.checkUrlString()}s/update${this.capitalizedTag}/`;
    // Define URLs to exclude
    const excludedUrls = [`/vendor/${this.capitalizedTag}s/all`];

    // Reset button properties to default values
    this.button.icon = 'add';
    this.button.text = `Add New ${this.capitalizedTag}`;
    this.button.url = `${this.checkUrlString()}s/addNew${this.capitalizedTag}`;
    this.button.disable = false;
    this.button.class = ['btn1'];

    // Check if the current URL starts with the base URL without parameters
    if (currentUrl.startsWith(baseUrlWithoutParams) && !excludedUrls.includes(currentUrl)) {
      // If it matches and not in excluded URLs, set the button properties
      this.button.icon = 'update';
      this.button.text = `Update ${this.capitalizedTag}`;
      this.button.url = currentUrl;
      this.button.class = ['btn1', 'update-btn'];
      this.button.disable = true;
    } else if (currentUrl.startsWith(`/vendor/${this.checkUrlString()}s/${this.checkUrlString()}/`) && !excludedUrls.includes(currentUrl)) {
      // Hide button for specific URLs
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
}

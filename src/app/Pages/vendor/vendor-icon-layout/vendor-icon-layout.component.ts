import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/Interfaces/interfaces';

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

  button: Button = {
    icon: 'add',
    text: 'Add New Service',
    url: 'services/addNewService',
    class: ['btn1'],
    type:'button',
    disable:false
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Call the ChangeButton method to update the button value
        this.ChangeButton();
      }
    });
    this.ChangeButton(); // Initial call to ChangeButton
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ChangeButton() {
    // Get the current URL
    const currentUrl = this.router.url;

    // Define the base URL without parameters
    const baseUrlWithoutParams = '/vendor/services/updateService/';

    // Define URLs to exclude
    const excludedUrls = ['/vendor/Services/all'];

    // Reset button properties to default values
    this.button.icon = 'add';
    this.button.text = 'Add New Service';
    this.button.url = 'services/addNewService';
    this.button.disable = false;
    this.button.class = ['btn1'];

    // Check if the current URL starts with the base URL without parameters
    if (currentUrl.startsWith(baseUrlWithoutParams) && !excludedUrls.includes(currentUrl)) {
      // If it matches and not in excluded URLs, set the button properties
      this.button.icon = 'update';
      this.button.text = 'Update Service';
      this.button.url = currentUrl;
      this.button.class = ['btn1','update-btn'];
      this.button.disable = true;
    } else if (currentUrl.startsWith('/vendor/services/service/') && !excludedUrls.includes(currentUrl)) {
      // Hide button for specific URLs
      this.button.class = ['hideButton'];
    }
  }
}

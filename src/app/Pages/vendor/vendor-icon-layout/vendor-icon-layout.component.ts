import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-vendor-icon-layout',
  templateUrl: './vendor-icon-layout.component.html',
  styleUrls: ['./vendor-icon-layout.component.scss']
})
export class VendorIconLayoutComponent {

  private routerSubscription!: Subscription
  soRId: string = '';
  name: string = '';

  constructor(private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Call the ChangeButton method to update the button value
        this.ChangeButton();
      }
    });
    this.ChangeButton();
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
    const baseUrlWithoutParams = '/vendor/updateService/';
  
    // Define URLs to exclude
    const excludedUrls = ['/vendor/allService'];
  
    // Reset button properties to default values
    this.button.icon = 'add';
    this.button.text = 'Add New Service';
    this.button.url = 'addNewService';
    this.button.disable = false;
    this.button.class = ['btn1']
    // Check if the current URL starts with the base URL without parameters
    if (currentUrl.startsWith(baseUrlWithoutParams) && !excludedUrls.includes(currentUrl)) {
      // If it matches and not in excluded URLs, set the button properties
      this.button.icon = 'update';
      this.button.text = 'Update Service';
      this.button.url = currentUrl;
      this.button.class = ['btn1','update-btn']
      this.button.disable = true;
    } else if (currentUrl.startsWith('/vendor/services/service/') && !excludedUrls.includes(currentUrl)) {
      this.button.class = ['hideButton'];
    }
  }

  icons = [
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: '',
    }
  ];
  buttonToggle: boolean = false;

  button: Button =
    {
      icon: 'add',
      text: 'Add New Service',
      url: 'addNewService',
      class: ['btn1'],
      type:'button',
      disable:false
    };
}

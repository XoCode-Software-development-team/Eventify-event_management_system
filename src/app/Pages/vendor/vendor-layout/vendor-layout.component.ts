import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.scss']
})
export class VendorLayoutComponent {
  // Navigation links list for the vendor layout
  navList = [
    {
      text: "Home",
      url: "home"
    },
    {
      text: "Service",
      url: "services"
    },
    {
      text: "Resource",
      url: "resources"
    },
    {
      text: "UserGuide",
      url: "userGuide"
    }
  ]
}

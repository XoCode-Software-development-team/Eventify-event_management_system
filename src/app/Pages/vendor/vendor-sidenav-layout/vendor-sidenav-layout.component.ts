import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-sidenav-layout',
  templateUrl: './vendor-sidenav-layout.component.html',
  styleUrls: ['./vendor-sidenav-layout.component.scss']
})
export class VendorSidenavLayoutComponent {
  // Navigation bar of vendor
  navbar = [
    {
      Tag: 'All Services',
      Url: 'services/all',
    },
    {
      Tag: 'Booked Services',
      Url: 'services/bookedServices',
    },
    {
      Tag: 'Booking Requests',
      Url: 'services/bookingRequests',
    }
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-sidenav-layout',
  templateUrl: './vendor-sidenav-layout.component.html',
  styleUrls: ['./vendor-sidenav-layout.component.scss']
})
export class VendorSidenavLayoutComponent {
  navbar = [
    {
      Tag: 'All Services',
      Url: 'services',
    },
    {
      Tag: 'Booked Services',
      Url: 'bookedServices',
    },
    {
      Tag: 'Booking Requests',
      Url: 'bookingRequests',
    }
  ];
}

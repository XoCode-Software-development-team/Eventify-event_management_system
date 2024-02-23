import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.scss']
})
export class VendorLayoutComponent {

  navbar = [
    {
      Tag: 'All Services',
      Url: 'allServices',
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

  button =
    {
      Icon: 'add',
      Text: 'Add New Services',
      Url: 'addNewService'
    };
}

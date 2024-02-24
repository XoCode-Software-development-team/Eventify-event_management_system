import { Component } from '@angular/core';

interface Button {
  icon: string;
  text: string;
  url: string;
  style: string;
}

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

  buttonToggle: boolean = false;

  button: Button =
    {
      icon: 'add',
      text: 'Add New Services',
      url: 'addNewService',
      style: 'btn1'
    };
}



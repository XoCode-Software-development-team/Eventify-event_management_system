import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button, ServiceDetails } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _service: ServiceService
  ) {}

  soRId: number = 0;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.soRId = params['soRId'];
    });
    this.getServiceDetails();
  }

  icons = [
    {
      Name: 'compare',
      Url: '',
    },
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: '',
    },
  ];

  backButton: Button = {
    icon: 'navigate_before',
    text: 'Go back',
    url: '/services',
    class: ['btn2'],
    type: 'button',
    disable: false,
  };

  compareButton = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    display: 'inline',
  };
  followButton = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'subscriptions',
    display: 'inline',
  };
  chatButton = {
    url: '',
    type: 'button',
    text: 'Chat',
    icon: 'chat',
    display: 'inline',
  };
  bookButton = {
    url: '',
    type: 'button',
    text: 'Book Now',
  };

  serviceDetails: ServiceDetails = {
    name: 'Swan Boat Ride',
    vendor: {
      vendorId: 'vendor123',
      companyName: 'AquaVista Cruises',
    },
    capacity: 50,
    description:
      "Embark on Unforgettable Journeys through the Mystical and Enchanting Waters During a swan boat ride, individuals or groups can leisurely paddle or pedal the boat through the water. The primary aim is usually relaxation and enjoyment, taking in the natural surroundings and the peaceful atmosphere. Swan boat rides are popular in locations where there's a focus on providing a gentle and pleasant experience on the water.",
    reviewAndRating: [
      {
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0OobsBilOGySRuaSpCmAMSiuupz02KRRgyDyM1308w&s',
        name: 'Pramudi Srimali',
        rate: 4.2,
        comment: 'Service 1 is good.',
      },
      {
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0OobsBilOGySRuaSpCmAMSiuupz02KRRgyDyM1308w&s',
        name: 'Supipi Kaveesha',
        rate: 2.3,
        comment: 'Service 2 is very good.',
      },
    ],
    price: [
      {
        value: 50,
        model: 'hour',
      },
      {
        value: 100,
        model: 'day',
      },
    ],
    images: [],
    videos: [],
  };

  getServiceDetails() {
    this._service.getServiceDetailsForClient(this.soRId).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

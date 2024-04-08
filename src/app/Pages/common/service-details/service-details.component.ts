import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button, ServiceDetails, FeatureAndFacility } from 'src/app/Interfaces/interfaces';
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

  isLoading: boolean = false; // Flag to indicate loading state


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
    name: '',
    vendor: {
      vendorId: '',
      companyName: '',
    },
    capacity: 0,
    description: '',
    reviewAndRating: [],
    featureAndFacility: [],
    price: [],
    images: [],
    videos: [],
  };

  getServiceDetails() {
    this.isLoading = true;
    this._service.getServiceDetailsForClient(this.soRId).subscribe({
      next: (res: any) => {
        console.log(res);
        res = res[0];
        this.serviceDetails = {
          name: res.name,
          vendor: res.vendor,
          capacity: res.capacity,
          description: res.description,
          reviewAndRating: res.reviewAndRating,
          featureAndFacility: res.featureAndFacility,
          price: res.price,
          images: res.images,
          videos: res.videos,
        };

        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

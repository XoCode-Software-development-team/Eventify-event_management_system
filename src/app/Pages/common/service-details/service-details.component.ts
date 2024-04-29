import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { ServiceDetails } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService,
    private router: Router
  ) {}

  isVendor: boolean = false; // Flag to indicate vendor
  isAdmin: boolean = false; // Flag to indicate admin
  isLoading: boolean = false; // Flag to indicate loading state
  soRId: number = 0;
  serviceName: string = '';

  // Button configurations
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
  updateButton = {
    url: '',
    type: 'button',
    text: 'Update',
    icon: 'update',
    display: 'inline',
  }

  // Service details object
  serviceDetails: ServiceDetails = {
    name: '',
    vendor: { vendorId: '', companyName: '' },
    capacity: 0,
    serviceCategory: '',
    description: '',
    reviewAndRating: [],
    featureAndFacility: [],
    location: [],
    price: [],
    images: [],
    videos: [],
  };

  ngOnInit(): void {
    // Subscribe to route params to get service ID
    this._route.params.subscribe((params) => {
      this.soRId = params['soRId'];
      this.serviceName = params['name'];
      this.updateButton.url = `/vendor/services/updateService/${this.soRId}/${this.serviceName}`,
      this.getServiceDetails();
    });

    this.checkUser();
  }

  // Function to fetch service details from the service
  getServiceDetails() {
    this.isLoading = true;
    this._serviceAndResource.getServiceDetailsForClient(this.soRId).subscribe({
      next: (res: any) => {
        // Assuming response is an array, take the first item
        if (Array.isArray(res) && res.length > 0) {
          const service = res[0];
          this.serviceDetails = {
            name: service.name,
            vendor: service.vendor,
            serviceCategory: service.serviceCategory,
            capacity: service.capacity,
            description: service.description,
            reviewAndRating: service.reviewAndRating,
            featureAndFacility: service.featureAndFacility,
            location: service.location,
            price: service.price,
            images: service.images,
            videos: service.videos,
          };
          console.log(res);
        } else {
          console.log("No service details found.");
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  checkUser() {
    // Get the current URL
    const currentUrl = this.router.url;

    const vendorUrl = '/vendor/services/service/';
    const adminUrl = '/admin/services/service/';

    // Check if the current URL contains the vendor or admin path segments
    this.isVendor = currentUrl.includes(vendorUrl);
    this.isAdmin = currentUrl.includes(adminUrl);
  }
}

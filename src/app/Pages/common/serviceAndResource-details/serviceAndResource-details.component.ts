import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { ServiceResourceDetails } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';

@Component({
  selector: 'app-service-details',
  templateUrl: './serviceAndResource-details.component.html',
  styleUrls: ['./serviceAndResource-details.component.scss'],
})
export class ServiceAndResourceDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService,
    private router: Router
  ) {}

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  isVendor: boolean = false; // Flag to indicate vendor
  isAdmin: boolean = false; // Flag to indicate admin
  isLoading: boolean = false; // Flag to indicate loading state
  soRId: number = 0;
  serviceResourceName: string = '';

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


  // Service/Resource details object
  serviceResourceDetails: ServiceResourceDetails = {
    name: '',
    vendor: { vendorId: '', companyName: '' },
    capacity: 0,
    Category: '',
    description: '',
    reviewAndRating: [],
    featureAndFacility: [],
    location: [],
    price: [],
    images: [],
    videos: [],
  };

  ngOnInit(): void {
    // Subscribe to route params to get service/resource ID
    this._route.params.subscribe((params) => {
      this.soRId = params['soRId'];
      this.serviceResourceName = params['name'];
      this.updateButton.url = `/vendor${this.checkUrlString()}s/update${this.capitalizedTag}/${this.soRId}/${this.serviceResourceName}`,
      this.getServiceDetails();
    });

    this.checkUser();
  }

  // Function to fetch service/resource details from the service/resource
  getServiceDetails() {
    this.isLoading = true;
    this._serviceAndResource.getServiceAndResourceDetailsForClient(this.soRId).subscribe({
      next: (res: any) => {
        // Assuming response is an array, take the first item
        if (Array.isArray(res) && res.length > 0) {
            const serviceResource = res[0];
            this.serviceResourceDetails = {
              name: serviceResource.name,
              vendor: serviceResource.vendor,
              Category: serviceResource.serviceResourceCategory,
              capacity: serviceResource.capacity,
              description: serviceResource.description,
              reviewAndRating: serviceResource.reviewAndRating,
              featureAndFacility: serviceResource.featureAndFacility,
              location: serviceResource.location,
              price: serviceResource.price,
              images: serviceResource.images,
              videos: serviceResource.videos,
            };
        } else {
          console.log(`No ${this.checkUrlString()} details found.`);
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

    const vendorUrl = `/vendor/${this.checkUrlString()}s/${this.checkUrlString()}/`;
    const adminUrl = '/admin/${this.checkUrlString()}s/${this.checkUrlString()}/';

    // Check if the current URL contains the vendor or admin path segments
    this.isVendor = currentUrl.includes(vendorUrl);
    this.isAdmin = currentUrl.includes(adminUrl);
  }

    // Identify whether service or resource
    checkUrlString(): string{
      return this._serviceAndResource.checkUrlString();
    }
}

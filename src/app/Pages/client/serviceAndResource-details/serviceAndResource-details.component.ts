import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceResourceDetails } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './serviceAndResource-details.component.html',
  styleUrls: ['./serviceAndResource-details.component.scss'],
})
export class ServiceAndResourceDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService,
    private router: Router,
    private _toastService: ToastService
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
  };

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
    Manuals: [],
  };

  ngOnInit(): void {
    // Subscribe to route params to get service/resource ID
    this._route.params.subscribe((params) => {
      this.soRId = params['soRId'];
      this.serviceResourceName = params['name'];
      (this.updateButton.url = `/vendor/${this.checkUrlString()}s/update${
        this.capitalizedTag
      }/${this.soRId}/${this.serviceResourceName}`),
        this.getServiceDetails();
    });

    this.checkUser();
  }

  // Function to fetch service/resource details from the service/resource
  getServiceDetails() {
    this.isLoading = true;
    this._serviceAndResource
      .getServiceAndResourceDetailsForClient(this.soRId)
      .subscribe({
        next: (res: any) => {
          // Assuming response is an array, take the first item
          if (Array.isArray(res) && res.length > 0) {
            const serviceResource = res[0];
            console.log(serviceResource);
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
              Manuals: [],
            };

            this.serviceResourceDetails.Manuals =
              this.checkUrlString() === 'service'
                ? []
                : serviceResource.manuals;
          } else {
            const message = `No ${this.checkUrlString()} details found.`;
            this._toastService.showMessage(message, 'error');
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          // Handle error
          let errorMessage = `Failed to fetch ${this.checkUrlString()} details. Please try again later.`;
          if (err.status === 0) {
            errorMessage =
              'Failed to connect to the server. Please check your internet connection and try again.';
          }
          this._toastService.showMessage(errorMessage, 'error');
          this.isLoading = false;
        },
      });
  }

  checkUser() {
    // Get the current URL
    const currentUrl = this.router.url;

    const vendorUrl = `/vendor/${this.checkUrlString()}s/${this.checkUrlString()}/`;
    const adminUrl = `/admin/${this.checkUrlString()}s/${this.checkUrlString()}/`;

    // Check if the current URL contains the vendor or admin path segments
    this.isVendor = currentUrl.includes(vendorUrl);
    this.isAdmin = currentUrl.includes(adminUrl);
  }

  getFileName(url: string): string {
    // Regular expression to extract text between %2F and .
    const regex = /%2F([^?]*)\?/;
    // Match the regex pattern against the URL
    const match = url.match(regex);

    // Check if a match is found
    if (match && match.length >= 2) {
      // Extract the text between symbols and decode URI components
      const textBetweenSymbols = decodeURIComponent(
        match[1].replace(/\+/g, ' ')
      );
      return textBetweenSymbols;
    } else {
      // Log message if no match is found
      console.log('No match found.');
      return '';
    }
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

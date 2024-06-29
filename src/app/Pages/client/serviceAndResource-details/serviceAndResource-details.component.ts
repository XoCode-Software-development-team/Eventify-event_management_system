import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDialogComponent } from 'src/app/Components/event-dialog/event-dialog.component';
import { Button, CompareList, ServiceResourceDetails, servicesAndResourcesCard } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ChatService } from 'src/app/Services/chat.service';
import { CompareService } from 'src/app/Services/compare.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VendorFollowService } from 'src/app/Services/vendor-follow.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './serviceAndResource-details.component.html',
  styleUrls: ['./serviceAndResource-details.component.scss'],
})
export class ServiceAndResourceDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _serviceAndResource: ServiceAndResourceService,
    private _router: Router,
    private _toastService: ToastService,
    private _dialog:MatDialog,
    private _auth:AuthenticationService,
    private _vendorFollow:VendorFollowService,
    private _compare:CompareService,
    private _chat:ChatService
  ) {}

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  isVendor: boolean = false; // Flag to indicate vendor
  isAdmin: boolean = false; // Flag to indicate admin
  isLoading: boolean = false; // Flag to indicate loading state
  soRId: number = 0;
  phone: string = '';
  serviceResourceName: string = '';
  isFollow!:boolean
  btnLoading!:boolean;

  // Button configurations
  compareButton = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    display: 'inline',
  };

  followButton: Button = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'person_add',
    class: ['follow'],
    iconClass: [],
    disable: false,
  };

  followedButton: Button = {
    url: '',
    type: 'button',
    text: 'Following',
    icon: 'person',
    class: ['following'],
    iconClass: [],
    disable: false,
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
    category: {
      categoryId:0,
      categoryName:''
    },
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
    if(this._auth.isLoggedIn()) {
      this.checkFollow(this.soRId);
    }
    this.getPhone();
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
            // console.log(serviceResource);
            this.serviceResourceDetails = {
              name: serviceResource.name,
              vendor: serviceResource.vendor,
              category: {
                categoryId:0,
                categoryName:''
              },
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

            if (this.checkUrlString() === 'service') {
              this.serviceResourceDetails.category.categoryId = serviceResource.serviceCategory.categoryId;
              this.serviceResourceDetails.category.categoryName = serviceResource.serviceCategory.serviceCategoryName;
            } else {
              this.serviceResourceDetails.category.categoryId = serviceResource.resourceCategory.categoryId;
              this.serviceResourceDetails.category.categoryName = serviceResource.resourceCategory.resourceCategoryName;            }

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
          // console.error(err);
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
    const currentUrl = this._router.url;

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
      // console.log('No match found.');
      return '';
    }
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }

  openDialog() {
    if(this._auth.isLoggedIn()) {
      this._dialog.open(EventDialogComponent, {
        data: { soRId: this.soRId }
      });
    } else {
      this._router.navigate(['login']);
      this._toastService.showMessage("Please login first!",'info');
      return;
    }
  }

  checkFollow(soRId: number){
    this.btnLoading = true;
    this._vendorFollow.isFollow(soRId).subscribe({
      next:(res:any) => {
        // console.log(res);
        this.isFollow = res.isFollow;
        this.btnLoading =false;
      },
      error:(err:any) => {
        // console.error(err);
        this.btnLoading = false;
      }
    })
  }

  toggleFollow(soRId: number): void {
    if (this._auth.isLoggedIn()) {
      this.btnLoading = true;
      this._vendorFollow.toggleFollow(soRId).subscribe({
        next: (res: any) => {
          // console.log(res)
          this._toastService.showMessage(res.message, 'success');
          this.checkFollow(soRId);
          this.isLoading = false;
        },
        error: (err: any) => {
          // console.log(err);
          this._toastService.showMessage(err.message, 'error');
          this.isLoading = false;
        }
      });
    } else {
      this._router.navigate(['login']);
      this._toastService.showMessage("Please login to follow!", 'info');
      this.isLoading = false;
    }
  }

  addToCompare() {
    let list: CompareList = {
      soRId:this.soRId,
      name:this.serviceResourceName,
      categoryId:this.serviceResourceDetails.category.categoryId
    }

    let isInList = this._compare.IsInList(list.soRId);
    if (isInList) {
      this._toastService.showMessage(`This ${this.checkUrlString()} already in compare box`,'info');
      return;
    }

    if (this.checkUrlString() === 'service') {
      this.addServiceToCompare(list);
    } else {
      this.addResourceToCompare(list);
    }
  }

  addServiceToCompare(item: CompareList) {
    this._compare.addServiceToCompare(item);
  }

  addResourceToCompare(item: CompareList) {
    this._compare.addResourceToCompare(item);
  }

  getPhone() {
    this._chat.getPhoneNumber(this.soRId).subscribe({
      next:(res:any) => {
        // console.log(res);
        if(res) {
          this.phone = res.phone
          // console.log(this.phone)
        }
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }

  openWhatsapp() {
    if (this.phone !== '') {
      const message = encodeURIComponent('Hello there!');
      const chatUrl = `https://wa.me/94${this.phone.slice(1)}?text=${message}`;
      window.open(chatUrl, '_blank');
    }
  }
  
  
  
  
}

import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-vendor-booking-requests',
  templateUrl: './vendor-booking-requests.component.html',
  styleUrls: ['./vendor-booking-requests.component.scss'],
})
export class VendorBookingRequestsComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent; // Reference to the TabCardComponent

  constructor(private _serviceAndResource: ServiceAndResourceService, private _toastService: ToastService) {}

  noData: boolean = false;
  dataSource = []; // Holds data source for the table
  categories: Category[] = []; // Holds categories for booking requests

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee"; // Vendor ID

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  displayedColumns: string[] = [ // Defines displayed columns for the table
    'No',
    this.capitalizedTag,
    'Event Name',
    'Event Date',
    'Pickup Date',
    'Action',
  ];

  // Retrieves services/resources for the specified category
  getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource.getServicesAndResourcesOfBookingRequest(categoryId, this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res; // Updates data source with fetched services
        this.noData = res.length == 0 ? true : false;
        if (res.length > 0) {
          this.noData = false;
        } else {
          // Display a toast message indicating no data found
          this._toastService.showMessage(`No ${this.checkUrlString()}s found for the selected category.`, 'error');
          this.noData = true;
        }
      },
      error: (err: any) => {
        console.error(`Error fetching ${this.checkUrlString()}s:`, err);

        // Display an error toast message
        this._toastService.showMessage(`Failed to load ${this.checkUrlString()}s. Please try again later.`, 'error');
  
        this.noData = true;
      },
    });
  }

// Retrieves categories for booking requests
getCategories() {
  this.noData = false;
  this.categories = [];
  this._serviceAndResource.getCategoriesOfBookingRequest(this.vendorId).subscribe({
    next: (res: any) => {
      // Maps the received data to category objects
      this.categories = res.map((item: any) => ({
        id: item.categoryId,
        categoryName: this.checkUrlString() === 'service'
          ? item.serviceCategoryName
          : item.resourceCategoryName,
      }));
      // Display a success toast message if categories are retrieved
      if (res.length > 0) {
        this.noData = false;
      } else {
        // Display a toast message indicating no categories found
        this._toastService.showMessage('No booking requested '+this.checkUrlString()+'s were found.', 'info');
        this.noData = true;
      }
    },
    error: (err: any) => {
      console.error('Error fetching data:', err);

      // Display an error toast message
      this._toastService.showMessage('Failed to load data. Please try again later.', 'error');

      this.noData = true;
    },
  });
}


// Rejects a service/resource booking request
RejectServiceAndResource(eventId: string, soRId: string) {
  this.dataSource = [];
  this._serviceAndResource.rejectServiceAndResourceFromVendor(eventId, soRId).subscribe({
    next: (res: any) => {
      // Display a success toast message
      this._toastService.showMessage('Rejected the booking request successfully.', 'success');
      
      this.categories = []; // Clears categories array
      this.getCategories(); // Fetches updated categories
      this.tabCardComponent.ngOnInit(); // Reinitializes the TabCardComponent
    },
    error: (err: any) => {
      console.error(`Error rejecting ${this.checkUrlString()} booking request:`, err);
      
      // Display an error toast message
      this._toastService.showMessage('Failed to reject the booking request. Please try again later.', 'error');
    },
  });
}


// Books a service/resource requested by a vendor
bookServiceAndResource(eventId: string, soRId: string) {
  this.dataSource = [];
  this._serviceAndResource.bookServiceAndResourceByVendor(eventId, soRId).subscribe({
    next: (res: any) => {
      // Display a success toast message
      this._toastService.showMessage('Booking request accepted successfully.', 'success');
      
      this.categories = []; // Clears categories array
      this.getCategories(); // Fetches updated categories
      this.tabCardComponent.ngOnInit(); // Reinitializes the TabCardComponent
    },
    error: (err: any) => {
      console.error(`Error booking ${this.checkUrlString()}:`, err);
      
      // Display an error toast message
      this._toastService.showMessage('Failed to accept the booking request. Please try again later.', 'error');
    },
  });
}


    // Identify whether service or resource
    checkUrlString(): string {
      return this._serviceAndResource.checkUrlString();
    }
}

import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-booking-requests',
  templateUrl: './vendor-booking-requests.component.html',
  styleUrls: ['./vendor-booking-requests.component.scss'],
})
export class VendorBookingRequestsComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent; // Reference to the TabCardComponent

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

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
      },
      error: (err: any) => {
        console.log(err);
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
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Rejects a service/resource booking request
  RejectServiceAndResource(eventId: string, soRId: string) {
    this._serviceAndResource.rejectServiceAndResourceFromVendor(eventId, soRId).subscribe({
      next: (res: any) => {
        alert("Reject the booking request successfully.")
        this.categories = []; // Clears categories array
        this.getCategories(); // Fetches updated categories
        this.tabCardComponent.ngOnInit(); // Re initializes the TabCardComponent
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Books a service/resource requested by a vendor
  bookServiceAndResource(eventId: string, soRId: string) {
    this._serviceAndResource.bookServiceAndResourceByVendor(eventId, soRId).subscribe({
      next: (res: any) => {
        alert("Accept the booking request successfully.");
        this.categories = []; // Clears categories array
        this.getCategories(); // Fetches updated categories
        this.tabCardComponent.ngOnInit(); // Re initializes the TabCardComponent
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

    // Identify whether service or resource
    checkUrlString(): string {
      return this._serviceAndResource.checkUrlString();
    }
}

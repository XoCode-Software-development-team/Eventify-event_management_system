import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
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

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  displayedColumns: string[] = [ // Defines displayed columns for the table
    'No',
    'Service',
    'Event Name',
    'Event Date',
    'Pickup Date',
    'Action',
  ];

  // Retrieves services for the specified category
  getServices(categoryId: string) {
    this.noData = false;
    this._serviceAndResource.getServicesOfBookingRequest(categoryId, this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res; // Updates data source with fetched services
        console.log(res);
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
    this._serviceAndResource.getCategoriesOfBookingRequest(this.vendorId).subscribe({
      next: (res: any) => {
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName,
        }));
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Rejects a service booking request
  RejectService(eventId: string, soRId: string) {
    console.log(eventId, soRId);
    this._serviceAndResource.rejectServiceFromVendor(eventId, soRId).subscribe({
      next: (res: any) => {
        alert("Reject the booking request successfully.")
        console.log(res);
        this.categories = []; // Clears categories array
        this.getCategories(); // Fetches updated categories
        this.tabCardComponent.ngOnInit(); // Reinitializes the TabCardComponent
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Books a service requested by a vendor
  bookService(eventId: string, soRId: string) {
    console.log(eventId, soRId);
    this._serviceAndResource.bookServiceByVendor(eventId, soRId).subscribe({
      next: (res: any) => {
        alert("Accept the booking request successfully.");
        console.log(res);
        this.categories = []; // Clears categories array
        this.getCategories(); // Fetches updated categories
        this.tabCardComponent.ngOnInit(); // Reinitializes the TabCardComponent
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

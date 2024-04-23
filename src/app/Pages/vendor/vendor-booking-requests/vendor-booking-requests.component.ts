import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-booking-requests',
  templateUrl: './vendor-booking-requests.component.html',
  styleUrls: ['./vendor-booking-requests.component.scss'],
})
export class VendorBookingRequestsComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent; // Reference to the TabCardComponent

  constructor(private _service: ServiceService) {}

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
    this._service.getServicesOfBookingRequest(categoryId, this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res; // Updates data source with fetched services
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Retrieves categories for booking requests
  getCategories() {
    this._service.getCategoriesOfBookingRequest(this.vendorId).subscribe({
      next: (res: any) => {
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Rejects a service booking request
  RejectService(eventId: string, soRId: string) {
    console.log(eventId, soRId);
    this._service.rejectServiceFromVendor(eventId, soRId).subscribe({
      next: (res: any) => {
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
    this._service.bookServiceByVendor(eventId, soRId).subscribe({
      next: (res: any) => {
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

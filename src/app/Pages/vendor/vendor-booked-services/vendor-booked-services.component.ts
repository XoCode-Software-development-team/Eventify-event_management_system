import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-booked-services',
  templateUrl: './vendor-booked-services.component.html',
  styleUrls: ['./vendor-booked-services.component.scss'],
})
export default class VendorBookedServicesComponent implements OnInit {

  constructor(private _service: ServiceService) { }

  dataSource = []; // Data source for the table

  categories: Category[] = []; // Array to store service categories

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Event Date',
    'End Date',
  ]; // Columns to be displayed in the table

  /**
   * Fetches booked services based on the category ID
   * @param categoryId The ID of the category
   */
  getServices(categoryId: string) {
    this._service.getBookedServicesOfVendor(categoryId, this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res; // Assigns the fetched data to the data source
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee"; // Vendor ID (temporary)

  /**
   * Fetches the service categories for booked services
   */
  getCategories() {
    this._service.getServiceCategoriesOfBookedServices(this.vendorId).subscribe({
      next: (res: any) => {
        // Maps the received data to category objects
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName,
        }));
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

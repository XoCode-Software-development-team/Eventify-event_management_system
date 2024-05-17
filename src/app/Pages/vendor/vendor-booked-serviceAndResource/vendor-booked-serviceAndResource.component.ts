import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-booked-services',
  templateUrl: './vendor-booked-serviceAndResource.component.html',
  styleUrls: ['./vendor-booked-serviceAndResource.component.scss'],
})
export default class VendorBookedServiceAndResourceComponent implements OnInit {
  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  noData: boolean = false;
  dataSource = []; // Data source for the table

  categories: Category[] = []; // Array to store service/resource categories

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  displayedColumns: string[] = [
    'No',
    this.capitalizedTag,
    'Event Date',
    'End Date',
  ]; // Columns to be displayed in the table

  //Fetches booked services/resources based on the category ID
  getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getBookedServiceAndResourcesOfVendor(categoryId, this.vendorId)
      .subscribe({
        next: (res: any) => {
          this.dataSource = res; // Assigns the fetched data to the data source
          this.noData = res.length == 0 ? true : false;
        },
        error: (err: any) => {
          this.noData = true;
          console.log(err);
        },
      });
  }

  vendorId: string = '2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee'; // Vendor ID (temporary)

  /**
   * Fetches the service/resource categories for booked services/resources
   */
  getCategories() {
    this.noData = false;
    this._serviceAndResource
      .getServiceAndResourceCategoriesOfBookedServices(this.vendorId)
      .subscribe({
        next: (res: any) => {
          // Maps the received data to category objects
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

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

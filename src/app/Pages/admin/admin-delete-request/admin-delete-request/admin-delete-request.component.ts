import { TabCardComponent } from './../../../../Components/tab-card/tab-card.component';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-admin-delete-request',
  templateUrl: './admin-delete-request.component.html',
  styleUrls: ['./admin-delete-request.component.scss'],
})
export class AdminDeleteRequestComponent implements OnInit {
  // Reference to the TabCardComponent instance
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(private _service: ServiceService) {}

  noData: boolean = false;
  // Array to hold data for the table
  dataSource: string[] = [];

  // Array to hold categories for delete request
  categories: Category[] = [];

  // Array of displayed column names for the table
  displayedColumns: string[] = ['No', 'Service', 'Rating', 'Action'];

  // Lifecycle hook, called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    this.getCategoriesOfDeleteRequest();
  }

  // Fetch services based on the selected category
  getServices(categoryId: string): void {
    this.noData = false;
    this.dataSource = [];
    this._service.getServiceListOfDeleteRequest(categoryId).subscribe({
      next: (res: any) => {
        if (res != null) {
          this.dataSource = res;
          this.noData = res.length == 0 ? true : false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Fetch categories of delete request
  getCategoriesOfDeleteRequest(): void {
    this.noData = false;
    this._service.getCategoriesListOfDeleteRequest().subscribe({
      next: (res: any) => {
        if (res != null) {
          // Map received data to Category interface and assign to categories array
          this.categories = res.map((item: any) => ({
            id: item.categoryId,
            categoryName: item.serviceCategoryName,
          }));
          this.noData = res.length == 0 ? true : false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Delete service based on ID
  deleteService(id: string): void {
    console.log(id);
    this._service.deleteServiceFromVendorRequest(id).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("Delete service successfully.");
        if (res.remainingCount > 0) {
          this.getServices(res.deletedServiceCategoryId);
        } else {
          // Reset categories array and fetch categories again
          this.categories = [];
          this.getCategoriesOfDeleteRequest();
          // Refresh tab card component
          this.tabCardComponent.ngOnInit();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Remove service based on ID
  removeService(id: string): void {
    this._service.removeServiceFromVendorRequest(id).subscribe({
      next: (res: any) => {
        alert("Delete request reject successfully.")
        if (res.remainingCount > 0) {
          this.getServices(res.deletedServiceCategoryId);
        } else {
          // Fetch categories again and refresh tab card component
          this.getCategoriesOfDeleteRequest();
          this.tabCardComponent.ngOnInit();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

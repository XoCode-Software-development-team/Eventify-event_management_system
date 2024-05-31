import { ToastService } from 'src/app/Services/toast.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-delete-request',
  templateUrl: './admin-delete-request.component.html',
  styleUrls: ['./admin-delete-request.component.scss'],
})
export class AdminDeleteRequestComponent implements OnInit {
  // Reference to the TabCardComponent instance
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService
  ) {}

  noData: boolean = false;
  // Array to hold data for the table
  dataSource: string[] = [];

  // Array to hold categories for delete request
  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  // Array of displayed column names for the table
  displayedColumns: string[] = ['No', this.capitalizedTag, 'Rating', 'Action'];

  // Lifecycle hook, called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    this.getCategoriesOfDeleteRequest();
  }

  // Fetch services/resources based on the selected category
  getServicesAndResources(categoryId: string): void {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getServiceAndResourceListOfDeleteRequest(categoryId)
      .subscribe({
        next: (res: any) => {
          if (res != null) {
            this.dataSource = res;
            this.noData = res.length == 0 ? true : false;
          }
        },
        error: (err: any) => {
          console.error(err);
          if (err.status === 404) {
            this._toastService.showMessage(
              `No ${this.capitalizedTag}s found for the selected category.`,
              'info'
            );
          } else if (err.status === 500) {
            this._toastService.showMessage(
              'Internal server error. Please try again later.',
              'error'
            );
          } else {
            this._toastService.showMessage(
              `An error occurred while fetching ${this.checkUrlString()}s.`,
              'error'
            );
          }
          this.noData = true;
        },
      });
  }

  // Fetch categories of delete request
  getCategoriesOfDeleteRequest(): void {
    this.noData = false;
    this._serviceAndResource.getCategoriesListOfDeleteRequest().subscribe({
      next: (res: any) => {
        if (!res.length)
          this._toastService.showMessage(
            `No ${this.checkUrlString()}s found.`,
            'info'
          );
        if (res != null) {
          // Map received data to Category interface and assign to categories array
          this.categories = res.map((item: any) => ({
            id: item.categoryId,
            categoryName:
              this.checkUrlString() === 'service'
                ? item.serviceCategoryName
                : item.resourceCategoryName,
          }));
          this.noData = res.length == 0 ? true : false;
        }
      },
      error: (err: any) => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            // Connection issue
            this._toastService.showMessage(
              'Connection issue: The server is unreachable or refused the connection.',
              'error'
            );
          } else if (err.status === 404) {
            // Resource not found
            this._toastService.showMessage(
              'Error: Resource not found. Please try again later.',
              'error'
            );
          } else {
            // Other HTTP error
            this._toastService.showMessage(
              `Error ${err.status}: ${err.error ? err.error : 'Unknown error'}`,
              'error'
            );
          }
        } else {
          // Non-HTTP error
          this._toastService.showMessage(
            'An error occurred. Please try again later.',
            'error'
          );
        }
        this.noData = true;
      },
    });
  }

  // Delete service/resource based on ID
  deleteServiceAndResource(id: string): void {
    this.dataSource = [];
    this._serviceAndResource
      .deleteServiceAndResourceFromVendorRequest(id)
      .subscribe({
        next: (res: any) => {
          // Show success toast message
          this._toastService.showMessage(
            `Delete ${this.checkUrlString()} successfully.`,
            'success'
          );
          if (res.remainingCount > 0) {
            this.checkUrlString() === 'service'
              ? this.getServicesAndResources(res.deletedServiceCategoryId)
              : this.getServicesAndResources(res.deletedResourceCategoryId);
          } else {
            // Reset categories array and fetch categories again
            this.categories = [];
            this.getCategoriesOfDeleteRequest();
            // Refresh tab card component
            this.tabCardComponent.ngOnInit();
          }
        },
        error: (err: any) => {
          // Log the error for debugging purposes
          console.error(err);

          // Show error toast message
          this._toastService.showMessage(
            `Failed to delete ${this.checkUrlString()}. Please try again later.`,
            'error'
          );
        },
      });
  }

  // Remove service/resource based on ID
  removeServiceAndResource(id: string): void {
    this.dataSource = [];
    this._serviceAndResource
      .removeServiceAndResourceFromVendorRequest(id)
      .subscribe({
        next: (res: any) => {
          // Show success toast message
          this._toastService.showMessage(
            'Delete request reject successfully.',
            'success'
          );
          if (res.remainingCount > 0) {
            this.checkUrlString() === 'service'
              ? this.getServicesAndResources(res.deletedServiceCategoryId)
              : this.getServicesAndResources(res.deletedResourceCategoryId);
          } else {
            // Fetch categories again and refresh tab card component
            this.getCategoriesOfDeleteRequest();
            this.tabCardComponent.ngOnInit();
          }
        },
        error: (err: any) => {
          // Log the error for debugging purposes
          console.error(err);

          // Show error toast message
          this._toastService.showMessage(
            'Failed to reject delete request. Please try again later.',
            'error'
          );
        },
      });
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

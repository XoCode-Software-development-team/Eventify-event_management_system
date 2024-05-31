import { Component, OnInit, ViewChild, PipeTransform } from '@angular/core';
import { TabCardComponent } from '../../../Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { ToastService } from 'src/app/Services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-serviceAndResource',
  templateUrl: './admin-serviceAndResource.component.html',
  styleUrls: ['./admin-serviceAndResource.component.scss'],
})
export class AdminServiceAndResourceComponent implements OnInit {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService
  ) {}

  noData: boolean = false;
  // Array to hold service/resource data
  dataSource: string[] = [];

  // Array to hold category data
  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  // Array of displayed columns
  displayedColumns: string[] = ['No', this.capitalizedTag, 'Rating', 'Action'];

  ngOnInit(): void {
    // Fetch categories on component initialization
    this.getCategories();
  }

  // Method to get services/resources based on category ID
  getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getServiceAndResourceListByCategory(categoryId)
      .subscribe({
        next: (res: any) => {
          this.dataSource = res;
          this.noData = res.length == 0 ? true : false;
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

  // Method to fetch categories
  getCategories() {
    this._serviceAndResource.getCategoriesList().subscribe({
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
        console.error(err);
        if (err instanceof HttpErrorResponse && err.status === 0) {
          // Connection issue
          this._toastService.showMessage(
            'Connection issue: The server is unreachable or refused the connection.',
            'error'
          );
        } else {
          // Other HTTP error
          this._toastService.showMessage(`Error: ${err.error}`, 'error');
        }
        this.noData = true;
      },
    });
  }

  // Method to change suspend state of a service/resource
  changeSuspendState(id: string) {
    this.dataSource = [];
    this._serviceAndResource.changeSuspendState(id).subscribe({
      next: (res: any) => {
        this.getServicesAndResources(res);
        this._toastService.showMessage(
          this.capitalizedTag+' state updated successfully.',
          'success'
        );
      },
      error: (err: any) => {
        console.error(err);
        this._toastService.showMessage(
          `Failed to update ${this.checkUrlString()} state. Please try again later.`,
          'error'
        );
      },
    });
  }

  // Method to delete a service/resource
  deleteServiceAndResource(id: string) {
    this.dataSource = [];
    this._serviceAndResource.deleteServiceAndResource(id).subscribe({
      next: (res: any) => {
        // Display a success toast message
        this._toastService.showMessage(
          `Delete ${this.checkUrlString()} successfully.`,
          'success'
        );
        if (res) {
          this.getServicesAndResources(res);
        }
      },
      error: (err: any) => {
        console.error(err);

        // Display an error toast message
        this._toastService.showMessage(
          `Failed to delete ${this.checkUrlString()}. Please try again later.`,
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

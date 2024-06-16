import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-vendor-service',
  templateUrl: './vendor-serviceAndResource.component.html',
  styleUrls: ['./vendor-serviceAndResource.component.scss']
})
export class VendorServiceAndResourceComponent implements OnInit, OnDestroy {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService
  ) {}

  noData: boolean = false;
  dataSource: string[] = [];
  private subscription!: Subscription;


  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  ngOnInit(): void {
    this.subscription = this._serviceAndResource.refresh$.subscribe(() => {
      this.getCategories();
    });
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayedColumns: string[] = ['No', `${this.capitalizedTag}`, 'Action'];

  // Function to retrieve services/resources based on category
  async getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getVendorServiceAndResourceListByCategory(categoryId)
      .subscribe({
        next: (res: any) => {
          this.dataSource = res;
          this.noData = res.length == 0 ? true : false;
        },
        error: (err: any) => {
          this.noData = true;
          console.error(err);
          // Display an error toast message
          this._toastService.showMessage(
            `Error fetching ${this.checkUrlString()}s`,
            'error'
          );
        },
      });
  }

  // Function to retrieve categories
  getCategories() {
    // Reset the loading state
    this.noData = false;

    this._serviceAndResource.getCategoriesListByVendor().subscribe({
      next: (res: any) => {
        // Map received category data to local categories array
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));

        // Check if there are no categories
        if (this.categories.length === 0) {
          // Display a message indicating no categories found
          this._toastService.showMessage(`No ${this.checkUrlString()}s were found`, 'info');
          this.noData = true;
        } else {
          // Categories found, set the loading state accordingly
          this.noData = false;
        }
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
        // Display an error toast message
        this._toastService.showMessage(
          'Failed to fetch categories. Please try again later.',
          'error'
        );
        // Set the loading state to true to handle UI accordingly
        this.noData = true;
      },
    });
  }

  // Function to initiate service/resource deletion request
  deleteServiceAndResource(id: string, deleteRequest: boolean) {
    this.dataSource = [];
    this._serviceAndResource.RequestToDelete(id).subscribe({
      next: (res: any) => {
        // Check if the delete request is being canceled or initiated
        if (deleteRequest) {
          // Display a success toast message for canceling the delete request
          this._toastService.showMessage(
            'Delete request canceled successfully',
            'success'
          );
        } else {
          // Display a success toast message for sending the delete request to admin
          this._toastService.showMessage(
            'Delete request sent to admin successfully',
            'success'
          );
        }
        // Refresh the service/resource list
        this.getServicesAndResources(res);
      },
      error: (err: any) => {
        // Log any errors
        console.error('Error initiating delete request:', err);
        // Display an error toast message
        this._toastService.showMessage(
          'Failed to initiate delete request. Please try again later.',
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

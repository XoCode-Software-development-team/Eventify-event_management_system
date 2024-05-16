import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-service',
  templateUrl: './vendor-serviceAndResource.component.html',
  styleUrls: ['./vendor-serviceAndResource.component.scss']
})
export class VendorServiceAndResourceComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(
    private _serviceAndResource: ServiceAndResourceService
  ) {}

  noData: boolean = false;
  dataSource: string[] = [];

  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee"; // Vendor Id (temporary)
    // vendorId: string = "b0ae24d4-03a5-4a3e-83b3-2e9c7f3245db";


  ngOnInit(): void {
    this.getCategories(this.vendorId);
  }

  displayedColumns: string[] = [
    'No',
    `${this.capitalizedTag}`,
    'Action',
  ];

  // Function to retrieve services/resources based on category
  async getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource.getVendorServiceAndResourceListByCategory(categoryId,this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        this.noData = true;
        console.log(err);
      },
    });
  }

  // Function to retrieve categories
  getCategories(id: string) {
    this.noData = false;
    this._serviceAndResource.getCategoriesListByVendor(id).subscribe({
      next: (res: any) => {
        this.categories = res.map((item:any) => ({
          id: item.categoryId,
          categoryName: this.checkUrlString() === 'service'
          ? item.serviceCategoryName
          : item.resourceCategoryName,
        }))
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Function to initiate service/resource deletion request
  deleteServiceAndResource(id: string, deleteRequest: boolean) {
    this._serviceAndResource.RequestToDelete(id).subscribe({
      next: (res: any) => {
        if (deleteRequest) {
          alert("Cancel the delete request")
        } else {
          alert("Send delete request to admin");
        }
        console.log(id,res)
        this.getServicesAndResources(res);
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

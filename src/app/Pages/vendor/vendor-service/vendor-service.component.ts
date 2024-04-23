import { Component, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-service',
  templateUrl: './vendor-service.component.html',
  styleUrls: ['./vendor-service.component.scss']
})
export class VendorServiceComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(
    private _service: ServiceService
  ) {}

  dataSource: string[] = [];

  categories: Category[] = [];

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee"; // Vendor Id (temporary)
    // vendorId: string = "b0ae24d4-03a5-4a3e-83b3-2e9c7f3245db";


  ngOnInit(): void {
    this.getCategories(this.vendorId);
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Action',
  ];

  // Function to retrieve services based on category
  getServices(categoryId: string) {
    this._service.getVendorServiceListByCategory(categoryId,this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Function to retrieve categories
  getCategories(id: string) {
    this._service.getCategoriesListByVendor(id).subscribe({
      next: (res: any) => {
        this.categories = res.map((item:any) => ({
          id: item.categoryId,
          categoryName:item.serviceCategoryName
        }))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Function to initiate service deletion request
  deleteService(id: string) {
    this._service.RequestToDelete(id).subscribe({
      next: (res: any) => {
        console.log(id,res)
        this.getServices(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private _service: ServiceService, private router: Router
  ) {}

  dataSource: string[] = [];

  categories: Category[] = [];

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee";

  ngOnInit(): void {
    this.getCategories(this.vendorId);
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Action',
  ];

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

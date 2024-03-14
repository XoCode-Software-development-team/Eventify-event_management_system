import { TabCardComponent } from './../../../../Components/tab-card/tab-card.component';
import { Component, Input, ViewChild } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-admin-delete-request',
  templateUrl: './admin-delete-request.component.html',
  styleUrls: ['./admin-delete-request.component.scss'],
})
export class AdminDeleteRequestComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(private _service: ServiceService) {}

  dataSource: string[] = [];

  categories: Category[] = [];

  ngOnInit(): void {
    this.getCategoriesOfDeleteRequest();
  }

  displayedColumns: string[] = ['No', 'Service', 'Rating', 'Action'];

  getServices(categoryId: string) {
    this._service.getServiceListOfDeleteRequest(categoryId).subscribe({
      next: (res: any) => {
        if (res != null){
          this.dataSource = res;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategoriesOfDeleteRequest() {
    this._service.getCategoriesListOfDeleteRequest().subscribe({
      next: (res: any) => {
        if (res != null) {
          this.categories = res.map((item: any) => ({
            id: item.categoryId,
            categoryName: item.serviceCategoryName,
          }));
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteService(id: string) {
    console.log(id)
    this._service.deleteServiceFromVendorRequest(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.remainingCount > 0) {
          this.getServices(res.deletedServiceCategoryId);
        } else {
          // location.reload();
          this.categories = []
          this.getCategoriesOfDeleteRequest();
          this.tabCardComponent.ngOnInit();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeService(id: string) {
    this._service.removeServiceFromVendorRequest(id).subscribe({
      next: (res: any) => {
        if (res.remainingCount > 0) {
          this.getServices(res.deletedServiceCategoryId);
        } else {
          // location.reload();
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

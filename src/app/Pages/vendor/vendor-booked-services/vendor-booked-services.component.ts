import { Component } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-booked-services',
  templateUrl: './vendor-booked-services.component.html',
  styleUrls: ['./vendor-booked-services.component.scss'],
})
export default class VendorBookedServicesComponent {

  constructor(private _service: ServiceService) {
    
  }

  dataSource = []

  categories: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Event Date',
    'End Date',
  ];

  getServices(categoryId: string) {
    this._service.getBookedServicesOfVendor(categoryId,this.vendorId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee";

  getCategories() {
    this._service.getServiceCategoriesOfBookedServices(this.vendorId).subscribe({
      next: (res: any) => {
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

  deleteService(id: string) {
    // this._vendorService.deleteService(id).subscribe({
    //   next: (res: any) => {
    //     if (res.remainingCount > 0) {
    //       this.getServices(res.deletedService.category);
    //     } else {
    //       location.reload();
    //     }
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }

  changeSuspendState(id: string) {
    // this._vendorService.changeSuspendState(id).subscribe({
    //   next: (res: any) => {
    //     this.getServices(res.category);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }
}

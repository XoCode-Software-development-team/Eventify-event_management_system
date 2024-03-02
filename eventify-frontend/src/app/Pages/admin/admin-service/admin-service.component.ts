import { Component, OnInit } from '@angular/core';
import { VendorServiceService } from 'src/app/Services/vendor-service/vendor-service.service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent implements OnInit {
  constructor(
    private _vendorService: VendorServiceService
  ) {}

  dataSource: string[] = [];
  categories: string[] = [];

  displayedColumns: string[] = [
    'No',
    'Service',
    'Rating',
    'Availability',
    'Action',
  ];

  ngOnInit(): void {
    this.getCategories();
  }

  getServices(category: string) {
    this._vendorService.getServiceListByCategory(category).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this._vendorService.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteService(id: string) {
    this._vendorService.deleteService(id).subscribe({
      next: (res: any) => {
        if (res.remainingCount > 0) {
          this.getServices(res.deletedService.category);
        } else {
          location.reload();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  changeSuspendState(id: string) {
    this._vendorService.changeSuspendState(id).subscribe({
      next: (res: any) => {
        this.getServices(res.category);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

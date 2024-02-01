import { Component } from '@angular/core';
import { VendorServiceService } from 'src/app/Services/vendor-service/vendor-service.service';

@Component({
  selector: 'app-admin-delete-request',
  templateUrl: './admin-delete-request.component.html',
  styleUrls: ['./admin-delete-request.component.scss']
})
export class AdminDeleteRequestComponent {
  constructor(
    private _vendorService: VendorServiceService,
  ) {}

  dataSource: string[] = [];

  categories: string[] = [];

  ngOnInit(): void {
    this.getCategoriesOfDeleteRequest();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Rating',
    'Action',
  ];

  navbar = [
    {
      Tag: 'All Services',
      Url: '',
    },
    {
      Tag: 'Delete Requests',
      Url: '',
    }
  ];

  getServices(category: string) {
    this._vendorService.getServiceListOfDeleteRequest(category).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategoriesOfDeleteRequest() {
    this._vendorService.getCategoriesListOfDeleteRequest().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteService(id: string) {
    this._vendorService.deleteServiceFromVendorRequest(id).subscribe({
      next: (res: any) => {
        console.log(res);
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


}

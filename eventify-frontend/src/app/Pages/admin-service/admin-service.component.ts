import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorServiceService } from 'src/app/Services/vendor-service/vendor-service.service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent implements OnInit {
  constructor(private _vendorService: VendorServiceService, private _router: Router, _route: ActivatedRoute) {}

  dataSource: string[] = [];

  categories: string[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Rating',
    'Availability',
    'Action',
  ];

  navbar = [
    {
      Tag: 'All Services',
      Url: '',
    },
    {
      Tag: 'Delete Requests',
      Url: 'deleteRequests',
    },
  ];

  getServices(category: string) {
    this._vendorService.getServiceListByCategory(category).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        console.log(res);
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


  deleteService(id:string) {
    this._vendorService.deleteService(id).subscribe({
      next: (res:any) => {
        this.getCategories();
        this.getServices(res.category);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}

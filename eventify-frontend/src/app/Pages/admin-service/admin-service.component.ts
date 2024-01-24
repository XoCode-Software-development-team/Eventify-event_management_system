import { Component, OnInit } from '@angular/core';
import { VendorServiceService } from 'src/app/Services/vendor-service/vendor-service.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  VendorId: string;
  Service: string;
  Rating: number;
  Availability: boolean;
}

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent implements OnInit {
  constructor(private _vendorService: VendorServiceService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getServices();
  }

  displayedColumns: string[] = [
    'VendorId',
    'Service',
    'Rating',
    'Availability',
    'Action',
  ];
  dataToDisplay: PeriodicElement[] = [];

  dataSource = new MatTableDataSource<PeriodicElement>([]);
  categories: string[]=[];
  navbar = [
    {
      Tag: 'All Services',
      Url: '.',
    },
    {
      Tag: 'Delete Requests',
      Url: '.',
    }
  ];
  getServices() {
    this._vendorService.getServiceList().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this._vendorService.getCategoriesList().subscribe({
      next:(res:any) => {
        this.categories=res;
      },
      error:(err:any) => console.log(err)
    })
  }
}

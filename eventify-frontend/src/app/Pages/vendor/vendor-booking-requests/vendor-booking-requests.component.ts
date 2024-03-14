import { Component } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-booking-requests',
  templateUrl: './vendor-booking-requests.component.html',
  styleUrls: ['./vendor-booking-requests.component.scss'],
})
export class VendorBookingRequestsComponent {

  constructor(private _service: ServiceService) {}

  dataSource = [  {
    No: 1,
    Service: 'service1',
    EventDate: '2024.01.05',
    EndDate: '2024.01.06'
  },
  {
    No: 2,
    Service: 'service2',
    EventDate: '2024.01.07',
    EndDate: '2024.01.08'
  },
  {
    No: 3,
    Service: 'service3',
    EventDate: '2024.01.09',
    EndDate: '2024.01.10'
  },
  {
    No: 4,
    Service: 'service4',
    EventDate: '2024.01.11',
    EndDate: '2024.01.12'
  },
  {
    No: 5,
    Service: 'service5',
    EventDate: '2024.01.13',
    EndDate: '2024.01.14'
  },
  {
    No: 6,
    Service: 'service6',
    EventDate: '2024.01.15',
    EndDate: '2024.01.16'
  },
  {
    No: 7,
    Service: 'service7',
    EventDate: '2024.01.17',
    EndDate: '2024.01.18'
  }];
  categories: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Event Date',
    'Pickup Date',
    'Action',
  ];

  getServices(category: string) {
    // this._vendorService.getServiceListByCategory(category).subscribe({
    //   next: (res: any) => {
    //     this.dataSource = res;
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }

  getCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName,
        }));
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

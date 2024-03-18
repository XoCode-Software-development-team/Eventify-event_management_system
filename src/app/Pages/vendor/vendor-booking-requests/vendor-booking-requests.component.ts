import { Component,ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-vendor-booking-requests',
  templateUrl: './vendor-booking-requests.component.html',
  styleUrls: ['./vendor-booking-requests.component.scss'],
})
export class VendorBookingRequestsComponent {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(private _service: ServiceService) {}

  dataSource = [];
  categories: Category[] = [];

  vendorId: string = "2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee";

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Event Name',
    'Event Date',
    'Pickup Date',
    'Action',
  ];

  getServices(categoryId: string) {
    this._service.getServicesOfBookingRequest(categoryId,this.vendorId).subscribe({
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
    this._service.getCategoriesOfBookingRequest(this.vendorId).subscribe({
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

  RejectService() {
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

  bookService(eventId:string,soRId:string) {
    console.log(eventId,soRId);
    this._service.bookServiceByVendor(eventId,soRId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = [];
        this.getCategories();
        this.tabCardComponent.ngOnInit();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

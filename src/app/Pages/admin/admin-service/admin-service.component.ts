import { Component, OnInit, ViewChild } from '@angular/core';
import { TabCardComponent } from './../../../Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent implements OnInit {
  @ViewChild('tabCard') tabCardComponent !: TabCardComponent;

  constructor(private _service: ServiceService) {}

  // Array to hold service data
  dataSource: string[] = [];

  // Array to hold category data
  categories: Category[] = [];

  // Array of displayed columns
  displayedColumns: string[] = ['No', 'Service', 'Rating', 'Action'];

  ngOnInit(): void {
    // Fetch categories on component initialization
    this.getCategories();
  }

  // Method to get services based on category ID
  getServices(categoryId: string) {
    this._service.getServiceListByCategory(categoryId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err.error);
        if (err.error == 'not found') {
          this.dataSource = [];
        }
      },
    });
  }

  // Method to fetch categories
  getCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName: item.serviceCategoryName
        }))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Method to change suspend state of a service
  changeSuspendState(id: string) {
    this._service.changeSuspendState(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getServices(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Method to delete a service
  deleteService(id: string) {
    this._service.deleteService(id).subscribe({
      next: (res: any) => {
          this.getServices(res);
          this.tabCardComponent.ngOnInit(); // Reinitializing TabCardComponent to reflect changes
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

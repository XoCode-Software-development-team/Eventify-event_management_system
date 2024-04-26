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

  noData: boolean = false;
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
    this.noData = false;
    this.dataSource = [];
    this._service.getServiceListByCategory(categoryId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
          this.noData = true;
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
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
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
        alert("Delete service successfully.")
          if (res) {
            this.getServices(res);
          }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

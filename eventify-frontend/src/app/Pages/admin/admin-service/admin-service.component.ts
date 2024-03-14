import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss'],
})
export class AdminServiceComponent implements OnInit {
  constructor(
    private _service: ServiceService
  ) {}

  dataSource: string[] = [];
  categories: Category[] = [];

  displayedColumns: string[] = [
    'No',
    'Service',
    'Rating',
    'Action',
  ];

  ngOnInit(): void {
    this.getCategories();
  }

  getServices(categoryId: string) {
    this._service.getServiceListByCategory(categoryId).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.map((item:any) => ({
          id: item.categoryId,
          categoryName:item.serviceCategoryName
        }))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

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

  deleteService(id: string) {
    this._service.deleteService(id).subscribe({
      next: (res: any) => {
          this.getServices(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit, ViewChild, PipeTransform } from '@angular/core';
import { TabCardComponent } from '../../../Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';

@Component({
  selector: 'app-admin-serviceAndResource',
  templateUrl: './admin-serviceAndResource.component.html',
  styleUrls: ['./admin-serviceAndResource.component.scss'],
})
export class AdminServiceAndResourceComponent implements OnInit {
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  noData: boolean = false;
  // Array to hold service/resource data
  dataSource: string[] = [];

  // Array to hold category data
  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text
  
  // Array of displayed columns
  displayedColumns: string[] = ['No', this.capitalizedTag, 'Rating', 'Action'];

  ngOnInit(): void {
    // Fetch categories on component initialization
    this.getCategories();
  }

  // Method to get services/resources based on category ID
  getServicesAndResources(categoryId: string) {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getServiceAndResourceListByCategory(categoryId)
      .subscribe({
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
    this._serviceAndResource.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
        this.noData = res.length == 0 ? true : false;
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Method to change suspend state of a service/resource
  changeSuspendState(id: string) {
    this._serviceAndResource.changeSuspendState(id).subscribe({
      next: (res: any) => {
        this.getServicesAndResources(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Method to delete a service/resource
  deleteServiceAndResource(id: string) {
    this._serviceAndResource.deleteServiceAndResource(id).subscribe({
      next: (res: any) => {
        alert(`Delete ${this.checkUrlString()} successfully.`);
        if (res) {
          this.getServicesAndResources(res);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

import { SliderComponent } from './../../../Components/slider/slider.component';
import { SortComponent } from './../../../Components/sort/sort.component';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';
import { Category, servicesCard } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss'],
})
export class AllServiceComponent implements OnInit {
  @ViewChild('sort') SortComponent!: SortComponent;
  @ViewChild('slider') SliderComponent!: SliderComponent;
  sortValue: any = '';

  constructor( private _service: ServiceService) {}

  // Paginator properties
  pageSize = 4;
  currentPage = 0;

  // Function to handle page change event
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPagedServices(): servicesCard[] {
    if (this.services.length > this.pageSize) {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.services.slice(startIndex, endIndex);
    }
    return this.services;
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getServices();
  }

  maxPrice: number = 0;
  categories: Category[] = [];

  services: servicesCard[] = [];

  // Function to truncate text and add "..." if it exceeds the maximum length
  truncateText(text: string | null | undefined, maxLength: number): string {
    if (text && text.length <= maxLength) {
      return text;
    } else if (text) {
      return text.substring(0, maxLength) + '...';
    } else {
      return '';
    }
  }

  getServices() {
    this.isLoading = true;

    this._service.getServicesForClients().subscribe({
      next: (res: any) => {
        this.services = res.map((item: any) => ({
          soRId: item.soRId,
          categoryId: item.categoryId,
          name: item.name,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count,
          },
          price: item.price,
          vendor: item.vendor,
          description: this.truncateText(item.description, 150),
          image:
            item.images.length > 0
              ? item.images[0]
              : '../../../assets/defaultService.jpg',
        }));
        this.sortServices('sNameAZ');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.isLoading = false;
  }

  getAllCategories() {
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

  sortServices(sortBy: string) {
    this.isLoading = true;
    // Copy original services array to maintain data integrity
    this.sorting(sortBy, this.services);

    this.isLoading = false;
  }

  sorting(sortBy: string, sortingList: any[]) {
    this.services = [...sortingList];

    // Apply sorting based on selected sort criteria
    if (sortBy === 'sNameAZ') {
      this.services.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sNameZA') {
      this.services.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'RateLH') {
      this.services.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (sortBy === 'RateHL') {
      this.services.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }

  i = 0;

  updateFilteredServices() {
    // If either array is empty, directly set services to the non-empty array
    console.log(this.rateFilteredServices);
    console.log(this.categoryFilteredServices);
    console.log(this.priceFilteredServices);
    console.log(this.i);
    this.i++;
    if (this.categoryFilteredServices.length === 0) {
      if (this.i > 7) {
        this.services = [];
      }
      // this.services = [];
    } else if (this.priceFilteredServices.length === 0) {
      if (this.i > 7) {
        this.services = [];
      }
      // this.services = [];
    } else if (this.rateFilteredServices.length === 0) {
      if (this.i > 7) {
        this.services = [];
      }
      // this.services = [];
    } else {
      // Apply category filtering to the price-filtered services
      let combinedFilteredServices = this.categoryFilteredServices
        .filter((service) => this.priceFilteredServices.includes(service))
        .filter((service) => this.rateFilteredServices.includes(service));

      // console.log(combinedFilteredServices);

      // Apply sorting to the combined filtered services
      this.sortValue = this.SortComponent.sortValue();
      this.sorting(this.sortValue, combinedFilteredServices);

      // Update the services property with the combined filtered and sorted services
      // this.services = combinedFilteredServices;
    }
  }

  categoryFilteredServices: any[] = [];
  priceFilteredServices: any[] = [];
  rateFilteredServices: any[] = [];

  priceFilter(filteredServices: any[]) {
    this.isLoading = true;
    this.priceFilteredServices = filteredServices;
    this.updateFilteredServices();
    this.isLoading = false;
  }

  categoryFilter(filteredServices: any[]) {
    this.isLoading = true;
    this.categoryFilteredServices = filteredServices;
    this.updateFilteredServices();
    this.isLoading = false;
  }

  rateFilter(filteredServices: any[]) {
    this.isLoading = true;
    this.rateFilteredServices = filteredServices;
    this.updateFilteredServices();
    this.isLoading = false;
  }

  isLoading: boolean = false; // Flag to indicate loading state

}

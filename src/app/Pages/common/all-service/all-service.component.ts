import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Category, servicesCard } from 'src/app/Interfaces/interfaces';
import { ServiceService } from 'src/app/Services/service/service.service';
import { SliderComponent } from './../../../Components/slider/slider.component';
import { SortComponent } from './../../../Components/sort/sort.component';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Improve performance using OnPush strategy
})
export class AllServiceComponent implements OnInit {
  // Variables
  pageSize = 4; // Number of services per page
  currentPage = 0; // Current page number
  isLoading: boolean = false; // Flag to indicate loading state
  maxPrice: number = 0; // Maximum price of services
  categories: Category[] = []; // Array to hold service categories
  services: servicesCard[] = []; // Array to hold service data
  i = 0; // Counter for filtering

  // ViewChild references
  @ViewChild('sort') SortComponent!: SortComponent; // Reference to SortComponent
  @ViewChild('slider') SliderComponent!: SliderComponent; // Reference to SliderComponent
  sortValue: any = ''; // Holds the current sorting value

  constructor(private _service: ServiceService) {}

  ngOnInit(): void {
    // Load categories and services on component initialization
    this.getAllCategories();
    this.getServices();
  }

  // Function to handle page change event
  onPageChange(event: any) {
    this.currentPage = event.pageIndex; // Update current page number
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
  }

  // Function to get paged services based on current page
  getPagedServices(): servicesCard[] {
    if (this.services.length > this.pageSize) {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.services.slice(startIndex, endIndex);
    }
    return this.services;
  }

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

  // Function to retrieve services from the service
  getServices() {
    this.isLoading = true; // Set loading state to true

    this._service.getServicesForClients().subscribe({
      next: (res: any) => {
        // Map received services data to local services array
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

        // Sort services after retrieval
        this.sortServices('sNameAZ');
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        // Set loading state to false once services are loaded
        this.isLoading = false;
      },
    });
  }

  // Function to retrieve all categories
  getAllCategories() {
    this._service.getCategoriesList().subscribe({
      next: (res: any) => {
        // Map received category data to local categories array
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

  // Function to sort services based on selected criteria
  sortServices(sortBy: string) {
    this.isLoading = true; // Set loading state to true

    // Copy original services array to maintain data integrity
    this.sorting(sortBy, this.services);

    this.isLoading = false; // Set loading state to false
  }

  // Function to perform sorting
  sorting(sortBy: string, sortingList: any[]) {
    this.services = [...sortingList]; // Copy the sorting list

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

  // Function to update services based on applied filters
  updateFilteredServices() {
    this.i++; // Increment the filter counter
    if (
      this.categoryFilteredServices.length === 0 ||
      this.priceFilteredServices.length === 0 ||
      this.rateFilteredServices.length === 0
    ) {
      if (this.i > 7) {
        this.services = []; // If any filter is empty, clear the services array
      }
    } else {
      // Apply category filtering to the price-filtered services
      let combinedFilteredServices = this.categoryFilteredServices
        .filter((service) => this.priceFilteredServices.includes(service))
        .filter((service) => this.rateFilteredServices.includes(service));

      // Apply sorting to the combined filtered services
      this.sortValue = this.SortComponent.sortValue(); // Get the sorting value from SortComponent
      this.sorting(this.sortValue, combinedFilteredServices);
    }
  }

  // Arrays to hold filtered services
  categoryFilteredServices: any[] = [];
  priceFilteredServices: any[] = [];
  rateFilteredServices: any[] = [];

  // Function to filter services by price
  priceFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.priceFilteredServices = filteredServices; // Set the price-filtered services
    this.updateFilteredServices(); // Update the filtered services
    this.isLoading = false; // Set loading state to false
  }

  // Function to filter services by category
  categoryFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.categoryFilteredServices = filteredServices; // Set the category-filtered services
    this.updateFilteredServices(); // Update the filtered services
    this.isLoading = false; // Set loading state to false
  }

  // Function to filter services by rate
  rateFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.rateFilteredServices = filteredServices; // Set the rate-filtered services
    this.updateFilteredServices(); // Update the filtered services
    this.isLoading = false; // Set loading state to false
  }
}

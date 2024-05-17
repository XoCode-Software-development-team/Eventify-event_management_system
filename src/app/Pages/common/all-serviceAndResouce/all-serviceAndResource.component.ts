import { Component, OnInit, ViewChild } from '@angular/core';

import {
  Category,
  servicesAndResourcesCard,
} from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { SliderComponent } from '../../../Components/slider/slider.component';
import { SortComponent } from '../../../Components/sort/sort.component';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-serviceAndResource.component.html',
  styleUrls: ['./all-serviceAndResource.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Improve performance using OnPush strategy
})
export class AllServiceAndResourceComponent implements OnInit {
  // Variables
  i = 0; // Counter for filtering
  pageSize = 4; // Number of services/resources per page
  currentPage = 0; // Current page number
  isLoading: boolean = false; // Flag to indicate loading state
  maxPrice: number = 0; // Maximum price of services
  categories: Category[] = []; // Array to hold service categories
  servicesAndResources: servicesAndResourcesCard[] = []; // Array to hold service data

  // Arrays to hold filtered services/resources
  categoryFilteredServicesAndResources: any[] = [];
  priceFilteredServicesAndResources: any[] = [];
  rateFilteredServicesAndResources: any[] = [];

  // ViewChild references
  @ViewChild('sort') SortComponent!: SortComponent; // Reference to SortComponent
  @ViewChild('slider') SliderComponent!: SliderComponent; // Reference to SliderComponent
  sortValue: any = ''; // Holds the current sorting value

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  ngOnInit(): void {
    // Load categories and services/resources on component initialization
    this.getAllCategories();
    this.getServicesAndResources();
  }

  // Function to handle page change event
  onPageChange(event: any) {
    this.currentPage = event.pageIndex; // Update current page number
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
  }

  // Function to get paged services/resources based on current page
  getPagedServicesAndResources(): servicesAndResourcesCard[] {
    if (this.servicesAndResources.length > this.pageSize) {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.servicesAndResources.slice(startIndex, endIndex);
    }
    return this.servicesAndResources;
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

  // Function to retrieve services/resources from the service
  getServicesAndResources() {
    this.isLoading = true; // Set loading state to true

    this._serviceAndResource.getServicesAndResourcesForClients().subscribe({
      next: (res: any) => {
        // Map received services/resources data to local services/resources array
        this.servicesAndResources = res.map((item: any) => ({
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

        // Sort services/resources after retrieval
        this.sortServicesAndResources('sNameAZ');
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        // Set loading state to false once services/resources are loaded
        this.isLoading = false;
      },
    });
  }

  // Function to retrieve all categories
  getAllCategories() {
    this._serviceAndResource.getCategoriesList().subscribe({
      next: (res: any) => {
        // Map received category data to local categories array
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Function to sort services/resources based on selected criteria
  sortServicesAndResources(sortBy: string) {
    this.isLoading = true; // Set loading state to true

    // Copy original services/resources array to maintain data integrity
    this.sorting(sortBy, this.servicesAndResources);

    this.isLoading = false; // Set loading state to false
  }

  // Function to perform sorting
  sorting(sortBy: string, sortingList: any[]) {
    this.servicesAndResources = [...sortingList]; // Copy the sorting list

    // Apply sorting based on selected sort criteria
    if (sortBy === 'sNameAZ') {
      this.servicesAndResources.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sNameZA') {
      this.servicesAndResources.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'RateLH') {
      this.servicesAndResources.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (sortBy === 'RateHL') {
      this.servicesAndResources.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }

  // Function to update services/resources based on applied filters
  updateFilteredServicesAndResources() {
    this.i++; // Increment the filter counter
    if (
      this.categoryFilteredServicesAndResources.length === 0 ||
      this.priceFilteredServicesAndResources.length === 0 ||
      this.rateFilteredServicesAndResources.length === 0
    ) {
      if (this.i > 7) {
        this.servicesAndResources = []; // If any filter is empty, clear the services/resources array
      }
    } else {
      // Apply category filtering to the price-filtered services/resources
      let combinedFilteredServices = this.categoryFilteredServicesAndResources
        .filter((serviceResource) => this.priceFilteredServicesAndResources.includes(serviceResource))
        .filter((serviceResource) => this.rateFilteredServicesAndResources.includes(serviceResource));

      // Apply sorting to the combined filtered services/resources
      this.sortValue = this.SortComponent.sortValue(); // Get the sorting value from SortComponent
      this.sorting(this.sortValue, combinedFilteredServices);
    }
  }

  // Function to filter services/resources by price
  priceFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.priceFilteredServicesAndResources = filteredServices; // Set the price-filtered services/resources
    this.updateFilteredServicesAndResources(); // Update the filtered services/resources
    this.isLoading = false; // Set loading state to false
  }

  // Function to filter services/resources by category
  categoryFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.categoryFilteredServicesAndResources = filteredServices; // Set the category-filtered services/resources
    this.updateFilteredServicesAndResources(); // Update the filtered services/resources
    this.isLoading = false; // Set loading state to false
  }

  // Function to filter services/resources by rate
  rateFilter(filteredServices: any[]) {
    this.isLoading = true; // Set loading state to true
    this.rateFilteredServicesAndResources = filteredServices; // Set the rate-filtered services/resources
    this.updateFilteredServicesAndResources(); // Update the filtered services/resources
    this.isLoading = false; // Set loading state to false
  }

  // Identify whether service or resource
  checkUrlString(): string{
    return this._serviceAndResource.checkUrlString();
  }
}

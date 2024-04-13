import { SortComponent } from './../../../Components/sort/sort.component';
import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
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
export class AllServiceComponent implements OnInit, OnChanges {
  @ViewChild('sort') SortComponent!: SortComponent;
  sortValue: any = '';

  constructor(private dialog: MatDialog, private _service: ServiceService) {}

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

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getServices();
  }

  navbar = [
    {
      Tag: 'All Services',
      Url: 'allServices',
    },
    {
      Tag: 'Delete Requests',
      Url: 'deleteRequests',
    },
  ];

  icons = [
    {
      Name: 'compare',
      Url: '',
    },
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: 'notification',
    },
  ];

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
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
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

  updateFilteredServices(filteredServices: any[]) {
    this.isLoading = true;
    this.sortValue = this.SortComponent.sortValue();
    this.sorting(this.sortValue, filteredServices);
    this.isLoading = false;
  }

  isLoading: boolean = false; // Flag to indicate loading state

  popUpNotification() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '170px',
      left: '950px',
    };

    this.dialog.open(NotificationBoxComponent, dialogConfig);
  }
}

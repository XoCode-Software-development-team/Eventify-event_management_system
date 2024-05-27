import { Component, OnInit } from '@angular/core';
import { servicesAndResourcesCard } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast/toast.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-serviceAndResource.component.html',
  styleUrls: ['./all-serviceAndResource.component.scss'],
})
export class AllServiceAndResourceComponent implements OnInit {
  pageSize = 4;
  currentPage = 0;
  isLoading = false;
  servicesAndResources: servicesAndResourcesCard[] = [];
  totalItems = 0;
  sortBy = 'sNameAZ';
  filters: {
    price: {
      minValue: number | null;
      maxValue: number | null;
      modelId: number | null;
    } | null;
    categories: number[] | null;
    rate: number | null;
  } = {
    price: null,
    categories: null,
    rate: null,
  };

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getServicesAndResources();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getServicesAndResources();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getServicesAndResources() {
    this.isLoading = true;
    this.servicesAndResources = [];
    if (
      this.filters.categories == null ||
      this.filters.categories.length == 0
    ) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      return;
    }
    this._serviceAndResource
      .getServicesAndResourcesForClients({
        page: this.currentPage,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        filters: this.filters,
      })
      .subscribe({
        next: (res: any) => {
          this.servicesAndResources = res.data;
          this.totalItems = res.totalItems;
        },
        error: (err: any) => {
          console.error(err);
          this._toastService.showMessage(
            `Failed to fetch ${this.checkUrlString()}s. Please try again later.`,
            'error'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  sortServicesAndResources(sortBy: string) {
    this.sortBy = sortBy;
    this.getServicesAndResources();
  }

  priceFilter(data: any) {
    this.filters.price = {
      minValue: data.minValue,
      maxValue: data.maxValue,
      modelId: data.priceModelId,
    };
    this.getServicesAndResources();
  }

  categoryFilter(checkedCategoryIds: any[]) {
    this.filters.categories = checkedCategoryIds;
    this.getServicesAndResources();
  }

  rateFilter(selectedRate: any) {
    this.filters.rate = selectedRate;
    this.getServicesAndResources();
  }

  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

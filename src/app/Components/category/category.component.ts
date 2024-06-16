import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExtendedCategory } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Output() categoryFilterDataSource: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService
  ) {}

  firstCategory: boolean = true;
  selectedCategory: boolean = true;
  extendedCategory: ExtendedCategory[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  firstCheckboxChange(event: any) {
    this.extendedCategory.forEach((category) => {
      category.checked = event.checked;
    });
    this.filterCategory();
  }

  selectCategory() {
    this.firstCategory = false;
  }

  filterCategory() {
    const checkedCategories = this.extendedCategory.filter(
      (category) => category.checked
    );
    const checkedCategoryIds = checkedCategories.map((category) => category.id);
    this.categoryFilterDataSource.emit(checkedCategoryIds);
  }

  getAllCategories() {
    this._serviceAndResource.getCategoriesList().subscribe({
      next: (res: any) => {
        this.extendedCategory = res.map((item: any) => ({
          checked: true,
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
        this.filterCategory();
      },
      error: (err: any) => {
        console.error(err);
        let errorMessage = 'Failed to fetch categories.';
        if (err.status === 0) {
          errorMessage += ' Please check your internet connection and try again.';
        } else {
          errorMessage += ' Please try again later.';
        }
        this._toastService.showMessage(errorMessage, 'error');
      },
    });
  }

  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

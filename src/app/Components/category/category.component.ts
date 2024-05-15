import { Category, ExtendedCategory } from './../../Interfaces/interfaces';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnChanges {
  @Input() CategoryList: Category[] = []; // Input property to receive the list of categories
  @Input() dataSource: any[] = []; // Input property to receive the data source
  @Output() categoryFilterDataSource: EventEmitter<any> =
    new EventEmitter<any>(); // Output property to emit the filtered data source
  firstCategory: boolean = true; // Flag to track the state of the first checkbox
  selectedCategory: boolean = true; // Flag to track the state of selected category
  originalDataSource: any[] = [];
  tempDataSource: any = [];
  newDataSource: any = [];
  extendedCategory: ExtendedCategory[] = [];

  ngOnChanges(): void {
    // Initialize original data source and extended category if not already initialized
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = [...this.dataSource];
    }
    if (this.extendedCategory.length === 0) {
      this.extendedCategory = this.CategoryList.map((category) => ({
        ...(category as ExtendedCategory),
        checked: true,
      }));
    }
    // Apply category filtering
    this.filterCategory();
  }

  firstCheckboxChange(event: any) {
    if (event.checked) {
      // Toggle the checked state of all checkboxes when the first checkbox is checked
      this.extendedCategory.forEach((category) => {
        category.checked = true;
      });
      // Apply category filtering
    } else {
      // Toggle the checked state of all checkboxes when the first checkbox is checked
      this.extendedCategory.forEach((category) => {
        category.checked = false;
      });
      // Apply category filtering
    }
    this.filterCategory();
  }

  selectCategory() {
    // Update the state of the first category flag
    this.firstCategory = false;
  }

  filterCategory() {
    // Filter the data source based on the checked categories
    const checkedCategories = this.extendedCategory.filter(
      (category) => category.checked === true
    );
    const checkedCategoryIds = checkedCategories.map((category) => category.id);
    this.dataSource = this.originalDataSource.filter((item) =>
      checkedCategoryIds.includes(item.categoryId)
    );
    // Emit the filtered data source
    this.categoryFilterDataSource.emit(this.dataSource);
  }
}

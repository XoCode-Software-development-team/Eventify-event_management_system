import { Category, ExtendedCategory } from './../../Interfaces/interfaces';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input() CategoryList: Category[] = [];
  @Input() dataSource: any[] = [];
  @Output() categoryFilterDataSource:any = new EventEmitter<any>();
  firstCategory: boolean = true;
  selectedCategory: boolean = true;
  originalDataSource: any[] = [];
  tempDataSource: any = [];
  newDataSource: any = [];
  extendedCategory: ExtendedCategory[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.originalDataSource.length == 0) {
      this.originalDataSource = [...this.dataSource];
    }
    if (this.extendedCategory.length == 0) {
      this.extendedCategory = this.CategoryList.map((category) => ({
        ...(category as ExtendedCategory),
        checked: true,
      }));
    }
  }

  firstCheckboxClick(event: MouseEvent): void {
    // Update the state of all checkboxes based on the first checkbox
    if (!this.firstCategory) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }

  firstCheckboxChange(event: any) {
    if (event.checked) {
      // Toggle the checked state of all checkboxes except the one clicked
      this.extendedCategory.forEach((category) => {
        category.checked = true;
      });
      this.filterCategory();
    }
  }

  selectCategory() {
    this.firstCategory = false;
    
  }

  filterCategory() {
    const checkedCategories = this.extendedCategory.filter(
      (category) => category.checked == true
    );
    const checkedCategoryIds = checkedCategories.map((category) => category.id);
    this.dataSource = this.originalDataSource.filter((item) =>
      checkedCategoryIds.includes(item.categoryId)
    );
    console.log(this.dataSource);
    this.categoryFilterDataSource.emit(this.dataSource);
  }

}

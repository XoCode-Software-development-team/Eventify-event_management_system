import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  @Input() dataSource: any;
  @Output() sortChange = new EventEmitter<string>();
  selectedSort: string;

  constructor() {
    // Set the initial value of selectedFood to the value of the first option
    this.selectedSort = this.sortBy[0].value;
  }

  sortBy = [
    {value: 'sNameAZ', viewValue: 'Service name A to Z'},
    {value: 'sNameZA', viewValue: 'Service name Z to A'},
    {value: 'RateLH', viewValue: 'Rating low to hight'},
    {value: 'RateHL', viewValue: 'Rating hight to low'},
  ];

  sortService(value:string) {
    this.selectedSort=value;
    this.sortChange.emit(this.selectedSort);
  }

  sortValue():string {
    return this.selectedSort;
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  // Input to receive the data source to be sorted
  @Input() dataSource: any;
  
  // Output event emitter to notify the parent component about the sorting change
  @Output() sortChange = new EventEmitter<string>();
  
  // Variable to store the currently selected sorting option
  selectedSort: string;

  // Array defining the sorting options with their values and display names
  sortBy = [
    {value: 'sNameAZ', viewValue: 'Service name A to Z'},
    {value: 'sNameZA', viewValue: 'Service name Z to A'},
    {value: 'RateLH', viewValue: 'Rating low to high'},
    {value: 'RateHL', viewValue: 'Rating high to low'},
  ];

  constructor() {
    // Set the initial value of selectedSort to the value of the first option
    this.selectedSort = this.sortBy[0].value;
  }

  // Method triggered when a sorting option is selected
  sortService(value:string) {
    // Update the selected sorting option
    this.selectedSort = value;
    // Emit the selected sorting option to the parent component
    this.sortChange.emit(this.selectedSort);
  }

  // Method to retrieve the currently selected sorting option
  sortValue():string {
    return this.selectedSort;
  }

}

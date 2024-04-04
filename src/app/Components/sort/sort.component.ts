import { Component } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  selectedFood: string;

  constructor() {
    // Set the initial value of selectedFood to the value of the first option
    this.selectedFood = this.foods[0].value;
  }

  foods = [
    {value: 'steak-0', viewValue: 'Price lowest to hight'},
    {value: 'pizza-1', viewValue: 'Price hightest to low'},
  ];

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.scss']
})
export class FilterRatingComponent {
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}

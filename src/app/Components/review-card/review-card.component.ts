import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input() review: any; // Input property to receive review data from parent component

  // Method to parse rate to a number
  parseRate(rate: string | number | null | undefined): number | null {
    if (rate == null) return null; // Return null if rate is null or undefined
    return parseFloat(rate.toString()); // Parse rate to a number and return
  }
}

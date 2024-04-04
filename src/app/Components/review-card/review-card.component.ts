import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input() review:any;

  parseRate(rate: string | number | null | undefined): number | null {
    if (rate == null) return null;
    return parseFloat(rate.toString());
  }
}

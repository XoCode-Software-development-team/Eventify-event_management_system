import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Service {
  name: string;
  rate: number;
  reviewText: string;
}

@Component({
  selector: 'app-event-review',
  templateUrl: './event-review.component.html',
  styleUrls: ['./event-review.component.scss']
})
export class EventReviewComponent {
  maxRate: number = 5;
  services: Service[] = [
    { name: 'Service 1', rate: 0, reviewText: '' },
    { name: 'Service 2', rate: 0, reviewText: '' },
  ];

  constructor(public dialogRef: MatDialogRef<EventReviewComponent>) {}

  submitReview() {
    for (let service of this.services) {
      console.log('Service Name:', service.name);
      console.log('Rating:', service.rate);
      console.log('Review Text:', service.reviewText);
    }

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}

import { Rating } from './../../Interfaces/interfaces';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.scss'],
})
export class FilterRatingComponent implements OnInit, OnChanges {
  @Input() dataSource:any[] = []; // Input property for the data source
  @Output() rateFilteredDataSource: any = new EventEmitter<any>(); // Output event emitter for filtered data
  allRate: Rating = {
    rate: -1,
    count: 0
  };
  ratings: Rating[] = [ // Initial ratings to filter by
    {
      rate: 4,
      count: 0
    },
    {
      rate: 3,
      count: 0
    },
    {
      rate: 2,
      count: 0
    },
    {
      rate: 1,
      count: 0
    }
  ];

  selectedModel: number = this.allRate.rate; // Default selected rating model
  originalDataSource: any[] = []; // Copy of the original data source

  ngOnInit(): void {
    this.allRateCount(); // Calculate total count of all ratings
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = this.dataSource; // Initialize original data source
    }
    this.filterRating(); // Filter the data based on selected rating
    this.countRatingCount(); // Count the number of services/resources for each rating
  }

  filterRating() {
    if (this.selectedModel === -1) {
      // Show all services/resources if rating is set to all
      this.dataSource = this.originalDataSource;
    } else {
      this.dataSource = this.originalDataSource.filter((service: any) => {
        return service.rating.rate >= this.selectedModel; // Filter services/resources based on selected rating
      });
    }
    this.rateFilteredDataSource.emit(this.dataSource); // Emit the filtered data
  }

  countRatingCount() {
    // Count the number of services/resources for each rating
    this.ratings.forEach((rating: any) => {
      rating.count = this.countRatingsGreaterThan(rating.rate);
    });
    // Calculate the total count of all ratings
    this.allRate.count = this.countRatingsGreaterThan(0);
  }

  countRatingsGreaterThan(threshold: number): number {
    let count = 0;
    // Count services/resources with ratings greater than or equal to the threshold
    for (const serviceAndResource of this.originalDataSource) {
      if (serviceAndResource.rating.rate >= threshold) {
        count++;
      }
    }
    return count;
  }

  allRateCount() {
    // Calculate the total count of all ratings
    for (let item of this.ratings) {
      this.allRate.count = this.allRate.count + item.count;
    }
  }

  selectedRate(event: any) {
    this.filterRating(); // Filter the data when a rating is selected
  }
}

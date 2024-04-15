import { Rating } from './../../Interfaces/interfaces';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.scss'],
})
export class FilterRatingComponent implements OnInit, OnChanges {
  @Input() dataSource:any[] = [];
  @Output() rateFilteredDataSource: any = new EventEmitter<any>();
  allRate: Rating = {
    rate:-1,
    count:0
  }
  ratings: Rating[] = [
    {
      rate:4,
      count:0
    },
    {
      rate:3,
      count:0
    },
    {
      rate:2,
      count:0
    },
    {
      rate:1,
      count:0
    }
  ];


  selectedModel:number = this.allRate.rate;
  originalDataSource:any[] = [];

  ngOnInit(): void {
    this.allRateCount();
  }
  i = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (this.originalDataSource.length === 0) {
      this.originalDataSource = this.dataSource
    }
    this.filterRating();
    this.countRatingCount();
  }

  filterRating() {
    if (this.selectedModel === -1) {
      // Do something if selectedModel is -1
      this.dataSource = this.originalDataSource
    } else {
      this.dataSource = this.originalDataSource.filter((service: any) => {
        return service.rating.rate >= this.selectedModel;
      });
    }
    this.rateFilteredDataSource.emit(this.dataSource);
  }

  countRatingCount() {
    this.ratings.forEach((rating:any) => {
      rating.count = this.countRatingsGreaterThan(rating.rate);
    })
    this.allRate.count = this.countRatingsGreaterThan(0);
  }
  
  countRatingsGreaterThan(threshold: number): number {
    let count = 0;
    for (const service of this.originalDataSource) {
      if (service.rating.rate >= threshold) {
        count++;
      }
    }
    return count;
  }
  

  allRateCount() {
    for (let item of this.ratings) {
      this.allRate.count = this.allRate.count+item.count;
    }
  }

  selectedRate(event:any) {
    console.log(event.value)
    this.filterRating()
  }
}

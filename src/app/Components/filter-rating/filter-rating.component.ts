import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rating } from './../../Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';

@Component({
  selector: 'app-filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.scss'],
})
export class FilterRatingComponent implements OnInit {

  @Output() rateFilteredDataSource: EventEmitter<any> = new EventEmitter<any>();

  allRate: Rating = {
    rate: 0,
    count: 0
  };
  ratings: Rating[] = [
    { rate: 4, count: 0 },
    { rate: 3, count: 0 },
    { rate: 2, count: 0 },
    { rate: 1, count: 0 }
  ];

  selectedModel: number = this.allRate.rate;
  ratingLoading:boolean = false;

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  ngOnInit(): void {
    this.allRateCount();
    this.filterRating(this.selectedModel);
    this.countRatingCount();
  }

  filterRating(rate:any) {
    this.rateFilteredDataSource.emit(rate);
  }

  countRatingCount() {
    this.ratingLoading = true;
    this._serviceAndResource.getRatingCount().subscribe({
      next:(res:any) => {
        this.allRate.count = res[0]
        this.ratings.forEach(r => {
          r.count = res[r.rate];
        })
        this.ratingLoading = false;
      },
      error:(err:any)=> {
        console.error(err);
      }
    })
  }

  allRateCount() {
    for (let item of this.ratings) {
      this.allRate.count += item.count;
    }
  }

  selectedRate(rate: any) {
    this.filterRating(rate.value);
  }
}

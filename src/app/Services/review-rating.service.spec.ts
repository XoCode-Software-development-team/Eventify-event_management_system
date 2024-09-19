import { TestBed } from '@angular/core/testing';

import { ReviewRatingService } from './review-rating.service';

describe('ReviewRatingService', () => {
  let service: ReviewRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

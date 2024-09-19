import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingModelComponent } from './review-rating-model.component';

describe('ReviewRatingModelComponent', () => {
  let component: ReviewRatingModelComponent;
  let fixture: ComponentFixture<ReviewRatingModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRatingModelComponent]
    });
    fixture = TestBed.createComponent(ReviewRatingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

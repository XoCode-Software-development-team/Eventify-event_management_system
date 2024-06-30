import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewRatingService } from 'src/app/Services/review-rating.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-review-rating-model',
  templateUrl: './review-rating-model.component.html',
  styleUrls: ['./review-rating-model.component.scss'],
})
export class ReviewRatingModelComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  @ViewChild('reviewForm') reviewForm!: NgForm;

  okButton = {
    url: '',
    type: 'submit',
    text: 'Save', // Specify your button text here
    disable: true,
  };

  review = {
    rate: 0.0,
    review: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { soRId: number; eventId: number },
    private _review: ReviewRatingService,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.reviewForm.valueChanges?.subscribe(() => {
      if (this.reviewForm?.valid) {
        this.okButton.disable = false;
      } else {
        this.okButton.disable = true;
      }
    });
  }

  closeDialog(): void {
    this._review.closeDialog();
  }

  save(form: NgForm): void { // Ensure the parameter type is NgForm
    this.isLoading = true;
    const ReviewAndRating = {
      rate: form.value.rate,
      review: form.value.review,
      soRId: this.data.soRId,
      eventId: this.data.eventId,
    };

    this._review.addReviewAndRating(ReviewAndRating).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) this._toast.showMessage(res.message, 'success');
        form.reset(); // Reset the form directly
        this.closeDialog();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this._toast.showMessage(
          'Something went wrong please try again later',
          'error'
        );
        this.isLoading = false;
      },
    });
  }

  parseRate(rate: string | number | null | undefined): number | null {
    if (rate == null) return null;
    return parseFloat(rate.toString());
  }
}

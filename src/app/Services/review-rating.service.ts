import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';
import { ReviewRatingModelComponent } from '../Components/review-rating-model/review-rating-model.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ReviewRatingService {
  private apiUrl = baseApiUrl.Url + '/api/reviewAndRating';
  popupToggle: boolean = false;
  private dialogRef: MatDialogRef<ReviewRatingModelComponent> | null = null;

  constructor(private _http: HttpClient, private _matDialog: MatDialog) {}

  openPopup(soRId: number, eventId: number) {
    if (!this.popupToggle) {
      this.dialogRef = this._matDialog.open(ReviewRatingModelComponent, {
        width: '500px',
        height: '50%',
        // position: { top: '165px', right: '130px' },
        data: {
          soRId: soRId,
          eventId: eventId,
        },
      });
      this.popupToggle = true;

      this.dialogRef.afterClosed().subscribe(() => {
        this.popupToggle = false;
        this.dialogRef = null;
      });
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

  addReviewAndRating(data:any) {
    return this._http.post(`${this.apiUrl}/add`,data);
  }

  getTopRatedVendors() {
    return this._http.get(`${this.apiUrl}/top`);
  }
}

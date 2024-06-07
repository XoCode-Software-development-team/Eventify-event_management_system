import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseApiUrl } from 'src/environments/environment';
import { UserCardComponent } from '../Components/user-card/user-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private Url: string = baseApiUrl.Url;
  private dialogRef: MatDialogRef<UserCardComponent> | null = null;
  popupToggle: boolean = false;

  constructor(private _http: HttpClient, private _matDialog: MatDialog) {}

  getUserAvatar(): Observable<string> {
    return this._http.get<string>(`${this.Url}/api/UserProfile/Avatar`);
  }

  openPopup() {
    if (!this.popupToggle) {
      this.dialogRef = this._matDialog.open(UserCardComponent, {
        // width: '18%',
        height: '12%',
        position: { top: '90px', right: '100px' },
      });
      this.popupToggle = true;

      this.dialogRef.afterClosed().subscribe(() => {
        this.popupToggle = false;
        this.dialogRef = null;
      });
    } else {
      this.dialogRef?.close();
    }
  }

  closePopup() {
    this.dialogRef?.close();
  }
}

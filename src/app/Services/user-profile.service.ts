import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseApiUrl } from 'environments/environment';
import { UserCardComponent } from '../Components/user-card/user-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private Url: string = baseApiUrl.Url;
  private dialogRef: MatDialogRef<UserCardComponent> | null = null;
  popupToggle: boolean = false;
  private userImage$ = new BehaviorSubject<string>('');

  imageUpdated$ = this.userImage$.asObservable();

  constructor(private _http: HttpClient, private _matDialog: MatDialog) {}

  getUserAvatar(): Observable<string> {
    return this._http.get<string>(`${this.Url}/api/userProfile/Avatar`);
  }

  updateAvatar(imageUrl: string) {
    return this._http.put(`${this.Url}/api/userProfile/updateAvatar`, [
      imageUrl,
    ]);
  }

  deleteAvatar() {
    return this._http.delete(`${this.Url}/api/userProfile/deleteAvatar`);
  }

  getUserDetails() {
    return this._http.get(`${this.Url}/api/userProfile/userDetails`);
  }

  updateUserDetails(userDetails:any) {
    return this._http.put(`${this.Url}/api/userProfile/userDetails`,userDetails);
  }

  deleteUser() {
    return this._http.delete(`${this.Url}/api/userProfile/`);
  }

  updatePassword(password:any) {
    return this._http.post(`${this.Url}/api/userProfile/updatePassword`,password);
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

  setUserImage(image: string) {
    this.userImage$.next(image);
  }

  getUserImage() {
    return this.userImage$.asObservable();
  }

  closePopup() {
    this.dialogRef?.close();
  }
}

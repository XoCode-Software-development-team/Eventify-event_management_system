import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastService } from 'src/app/Services/toast.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  userImage: string = '';
  userName: string = '';
  role: string = '';

  constructor(
    private _auth: AuthenticationService,
    private _userStore: UserStoreService,
    private _userProfile: UserProfileService,
    private _toast: ToastService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this._userStore.getUserNameFromStore().subscribe((val) => {
      const userNameFromToken = this._auth.getUserNameFromToken();
      this.userName = val || userNameFromToken;
    });
    this._userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this._auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.getAvatar();
  }

  signOut() {
    this._auth.logout();
    this._userProfile.closePopup();
    this._toast.showMessage('Log out successfully!', 'success');
  }

  getAvatar() {
    this._userProfile.getUserImage().subscribe(
      (val) => {
        this.userImage = val;
      }
    )
  }

  editProfile() {
    if (this.role != 'Client') {
      this._router.navigate([`${this.role.toLowerCase()}/profile`]);
    } else {
      this._router.navigate([`profile`]);
    }
    this._userProfile.closePopup();
  }
}

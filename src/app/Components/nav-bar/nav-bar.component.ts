import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { Component, Input, OnInit } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserProfileService } from 'src/app/Services/user-profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() nav: any; // Input for navigation items
  isLogin: boolean = false;
  userImage:string = '';

    // Button configurations
    signUp: Button = {
      url: 'signup',
      type: 'button',
      text: 'Signup',
      icon: '',
      class: [],
      iconClass: [],
      disable: false,
    };
  
    login: Button = {
      url: 'login',
      type: 'button',
      text: 'Login',
      icon: '',
      class: [],
      iconClass: [],
      disable: false,
    };

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _auth: AuthenticationService,
    private _userProfile: UserProfileService
  ) {}

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this.isLogin = true;
      this.getAvatar();
    } else {
      this.isLogin = false;
    }
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }

  getAvatar() {
    this._userProfile.getUserAvatar().subscribe({
      next:(res:any) => {
        console.log(res.message);
        this.userImage = res.userImage;
      },
      error:(err:any) => {
        console.log(err.message);
      }
    })
  }

  openProfileCard() {
    this._userProfile.openPopup();
  }

  isToggled() {
    return this._userProfile.popupToggle;
  }
}

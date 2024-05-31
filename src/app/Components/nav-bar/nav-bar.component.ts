import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { Component, Input, OnInit } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() nav: any; // Input for navigation items
  isLogin: boolean = false;

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

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

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

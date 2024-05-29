import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { Component, Input, OnInit } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() nav: any; // Input for navigation items
  @Input() user: any; // Input for user data

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  ngOnInit(): void {
    // Hide sign-up and login buttons if user is logged in
    if (this.user) {
      this.signUp.class = ['hide']; // Add 'hide' class to hide button
      this.login.class = ['hide']; // Add 'hide' class to hide button
    } else {
      this.signUp.class = ['']; // Remove 'hide' class to show button
      this.login.class = ['']; // Remove 'hide' class to show button
    }
  }

  // Button configurations
  signUp: Button = {
    url: 'signup',
    type: 'button',
    text: 'Signup',
    icon:'',
    class:[],
    disable:false
  };

  login: Button = {
    url: 'login',
    type: 'button',
    text: 'Login',
    icon:'',
    class:[],
    disable:false
  };

    // Identify whether service or resource
    checkUrlString(): string {
      return this._serviceAndResource.checkUrlString();
    }
  }

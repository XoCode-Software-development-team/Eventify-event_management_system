import { Component, Input, OnInit } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() nav: any;
  @Input() user: any;

  ngOnInit(): void {
      if (this.user) {
        this.signUp.class = ['hide'];
        this.login.class = ['hide'];
      } else {
        this.signUp.class = [''];
        this.login.class = [''];
      }
  }

  signUp: Button = {
    url: 'signUp',
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
}

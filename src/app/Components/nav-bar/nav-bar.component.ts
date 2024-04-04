import { Component, Input } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() nav: any;

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

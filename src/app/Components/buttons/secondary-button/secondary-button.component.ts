import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent {
  @Input() button:any;

  constructor(private _router:Router) {}

  navigate() {
    if (this.button.url != '') {
      this._router.navigate([this.button.url]);
    }
  }
}

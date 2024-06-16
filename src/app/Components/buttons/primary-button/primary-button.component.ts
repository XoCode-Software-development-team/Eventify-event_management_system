import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {

  constructor(private _router:Router) {}

  @Input() button: any;
  @Input() loading:boolean = false;

  navigate() {
    if (this.button.url != '') {
      this._router.navigate([this.button.url]);
    }
  }
}

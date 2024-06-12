import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  constructor(private _router:Router) {}

  @Input() button: any;
  @Input() isLoading:boolean = false;

  navigate() {
    if (this.button.url != '') {
      this._router.navigate([this.button.url]);
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any, public snackBarRef: MatSnackBarRef<ToastComponent>) {}
  
}

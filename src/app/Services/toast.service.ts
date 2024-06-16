import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from 'src/app/Components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(
    displayMessage: string,
    messageType: 'error' | 'success' | 'info' | 'warning'
  ) {
    this._snackBar.openFromComponent(ToastComponent, {
      data: {
        message: displayMessage,
        type: messageType,
      },
      duration:5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: [messageType, 'snackbar-animate-enter']
    });
  }
}

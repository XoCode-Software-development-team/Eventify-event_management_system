import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationBoxComponent } from 'src/app/Components/notification-box/notification-box.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  popupToggle: boolean = false;
  private dialogRef: MatDialogRef<NotificationBoxComponent> | null = null;

  constructor(private _matDialog: MatDialog) {}

  openPopup() {
    if (!this.popupToggle) {
      this.dialogRef = this._matDialog.open(NotificationBoxComponent, {
        width: '500px',
        height: '50%',
        position: { top: '165px', right: '130px' }, // Position in bottom-left corner
        // panelClass: 'custom-dialog-container', // Apply the custom CSS class
        data: {
          name: 'manoj',
          age: 10,
        },
      });
      this.popupToggle = true;

      this.dialogRef.afterClosed().subscribe(() => {
        this.popupToggle = false;
        this.dialogRef = null;
      });
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

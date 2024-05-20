import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}

    ngOnInit(): void {
        console.log(this.data.name);
    }
}

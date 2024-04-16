import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-icon-layout',
  templateUrl: './admin-icon-layout.component.html',
  styleUrls: ['./admin-icon-layout.component.scss']
})
export class AdminIconLayoutComponent {

  icons = [
    {
      Name: 'chat_bubble_outline',
      Url: '',
    },
    {
      Name: 'notifications_none',
      Url: '',
    },
  ];
}

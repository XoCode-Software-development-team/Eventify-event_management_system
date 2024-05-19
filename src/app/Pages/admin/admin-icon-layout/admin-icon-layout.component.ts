import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-icon-layout',
  templateUrl: './admin-icon-layout.component.html',
  styleUrls: ['./admin-icon-layout.component.scss']
})
export class AdminIconLayoutComponent {
  // Array of icons for admin layout
  icons = [
    { Name: 'chat_bubble_outline', Url: '',Badge: 5 }, // Chat icon
    { Name: 'notifications_none', Url: '',Badge: 5 } // Notification icon
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  // Navigation links for the admin dashboard
  navList = [
    { text: "Home", url: "home" },
    { text: "Service", url: "services" },
    { text: "Resource", url: "resources" },
    { text: "Dashboard", url: "dashboard" },
    { text: "UserGuide", url: "userGuide" },
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  navList = [
    {
      text: "Home",
      url: "home"
    },
    {
      text: "Service",
      url: "services"
    },
    {
      text: "Resource",
      url: "resource"
    },
    {
      text: "Users",
      url: "users"
    },
  ]

}

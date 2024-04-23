import { Component } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent {
  // Navigation list of client
  navList = [
    { text: "Home", url: "home" },
    { text: "Service", url: "services" },
    { text: "Resource", url: "resource" },
    { text: "Event", url: "event" },
    { text: "Dashboard", url: "dashboard" }
  ];
}

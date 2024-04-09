import { Component } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent {
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
      text: "Checklist",
      url: "checklist"
    },
    {
      text: "Event",
      url: "/client/event/create"
    }
  ]
}

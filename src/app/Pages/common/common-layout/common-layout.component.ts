import { Component } from '@angular/core';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent {

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
      text: "User guide",
      url: "userGuide"
    }
  ]
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav-layout',
  templateUrl: './admin-sidenav-layout.component.html',
  styleUrls: ['./admin-sidenav-layout.component.scss']
})
export class AdminSidenavLayoutComponent {
  navbar = [
    {
      Tag: 'All Services',
      Url: 'services',
    },
    {
      Tag: 'Delete Requests',
      Url: 'deleteRequests',
    },
  ];
}

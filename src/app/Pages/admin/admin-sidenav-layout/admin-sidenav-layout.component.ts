import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav-layout',
  templateUrl: './admin-sidenav-layout.component.html',
  styleUrls: ['./admin-sidenav-layout.component.scss']
})
export class AdminSidenavLayoutComponent {
  // Left side navigation tabs of admin in service section
  navbar = [
    { Tag: 'All Services', Url: 'services/all' },
    { Tag: 'Delete Requests', Url: 'services/deleteRequests' }
  ];
}

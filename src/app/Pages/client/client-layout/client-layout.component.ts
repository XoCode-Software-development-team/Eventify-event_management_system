import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
})
export class ClientLayoutComponent implements OnInit {
  // Navigation list of client
  beforeLogNavList = [
    { text: 'Home', url: 'home' },
    { text: 'Service', url: 'services' },
    { text: 'Resource', url: 'resources' },
    { text: 'Checklist', url: 'checklist' },
    { text: 'Agenda', url: 'agenda' },
  ];

  afterLogNavList = [
    { text: 'Home', url: 'home' },
    { text: 'Service', url: 'services' },
    { text: 'Resource', url: 'resources' },
    { text: 'Event', url: 'event' },
    { text: 'Dashboard', url: 'dashboard' },
  ];

  navList: any[] = [];

  constructor(private _auth: AuthenticationService) {}

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this.navList = this.afterLogNavList;
    } else {
      this.navList = this.beforeLogNavList;
    }
  }
}

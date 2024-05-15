import { Component } from '@angular/core';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss'],
})
export class CommonLayoutComponent {
  // Array containing navigation items
  navList = [
    { text: 'Home', url: 'home' }, // Home navigation item
    { text: 'Service', url: 'services' }, // Service navigation item
    { text: 'Resource', url: 'resources' }, // Resource navigation item
    { text: 'Checklist', url: 'checklist' }, // Checklist navigation item
  ];
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-admin-sidenav-layout',
  templateUrl: './admin-sidenav-layout.component.html',
  styleUrls: ['./admin-sidenav-layout.component.scss'],
})
export class AdminSidenavLayoutComponent implements OnInit {

  capitalizedTag: string = '';
  navbar: { Tag: string; Url: string; }[] = [];

  constructor(
    private router: Router,
    private _serviceAndResource: ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    // Initialize capitalizedTag and navbar
    this.refreshComponent();
    
    // Subscribe to router navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Refresh component on navigation
      this.refreshComponent();
    });
  }

  refreshComponent(): void {
    // Set capitalizedTag and navbar
    this.capitalizedTag = new CapitalizePipe().transform(this.checkUrlString());
    this.navbar = [
      { Tag: 'All ' + this.capitalizedTag + 's', Url: this.capitalizedTag.toLowerCase() + 's/all' },
      { Tag: 'Delete Requests', Url: this.capitalizedTag.toLowerCase() + 's/deleteRequests' },
    ];
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

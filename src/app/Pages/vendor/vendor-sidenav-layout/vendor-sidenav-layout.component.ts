import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-vendor-sidenav-layout',
  templateUrl: './vendor-sidenav-layout.component.html',
  styleUrls: ['./vendor-sidenav-layout.component.scss'],
})
export class VendorSidenavLayoutComponent implements OnInit {
  // Navigation bar of vendor
  navbar: { Tag: string; Url: string }[] = [];

  capitalizedTag: string = '';

  constructor(
    private router: Router,
    private _serviceAndResource: ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    // Initialize capitalizedTag and navbar
    this.refreshComponent();

    // Subscribe to router navigation events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Refresh component on navigation
        this.refreshComponent();
      });
  }

  refreshComponent(): void {
    // Set capitalizedTag and navbar
    this.capitalizedTag = new CapitalizePipe().transform(this.checkUrlString());
    this.navbar = [
      {
        Tag: 'All ' + this.capitalizedTag + 's',
        Url: this.checkUrlString() + 's/all',
      },
      {
        Tag: 'Booked ' + this.capitalizedTag + 's',
        Url: this.checkUrlString() + 's/booked' + this.capitalizedTag + 's',
      },
      {
        Tag: 'Booking Requests',
        Url: this.checkUrlString() + 's/bookingRequests',
      },
    ];
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

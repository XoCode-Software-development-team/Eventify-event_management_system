// query-params-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ServiceAndResourceService } from '../Services/serviceAndResource.service';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsGuard implements CanActivate {

  constructor(private router: Router,private _serviceAndResource:ServiceAndResourceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Check if query parameters exist
    const queryParams = next.queryParams;
    if (Object.keys(queryParams).length === 0) {
      // No query parameters, redirect to previous route
      this.router.navigate([`${this.serviceOrResource()}s`]); // Redirect to previous route or home page
      return false; // Prevent navigation to the current route
    }

    return true; // Allow navigation to the current route
  }

  serviceOrResource():string {
    return this._serviceAndResource.checkUrlString();
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { ToastService } from '../Services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthenticationService,private _router:Router,private _toast:ToastService) {}

  canActivate(): boolean {
    if (this._auth.isLoggedIn()) {
      return true;
    } else {
      this._toast.showMessage("Please login first!",'error');
      this._router.navigate(['login']);
      return false;
    }
  }

}

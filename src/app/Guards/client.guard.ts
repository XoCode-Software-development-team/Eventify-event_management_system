import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { ToastService } from '../Services/toast.service';
import { UserStoreService } from '../Services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanActivate {
  role:string = '';
  constructor(private _auth: AuthenticationService,private _router:Router,private _toast:ToastService,private _userStore:UserStoreService) {}

  canActivate(): boolean {

    this._userStore.getRoleFromStore().subscribe(
      (val)=> {
        const roleFromToken = this._auth.getRoleFromToken();
        this.role = val || roleFromToken;
      }
    )       
    if (this.role === 'Client') {
      return true;
    } else {
      this._toast.showMessage("Unauthorize access!",'error');
      this._router.navigate(['/']);
      return false;
    }
  }

}

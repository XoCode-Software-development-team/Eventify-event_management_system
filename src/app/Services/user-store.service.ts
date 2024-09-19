import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public getUserNameFromStore() {
    return this.userName$.asObservable();
  }

  public getIdFromStore() {
    return this.id$.asObservable();
  }



  public setRoleForStore(role:string) {
    this.role$.next(role);
  }

  public setUserNameForStore(userName:string) {
    this.userName$.next(userName);
  }

  public setIdForStore(id:string) {
    this.id$.next(id);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {

  constructor() { }

  private _dataDeletedSource = new Subject<void>();

  dataDeleted = this._dataDeletedSource.asObservable();

  notifyDataDeleted() {
    this._dataDeletedSource.next();
  }
}

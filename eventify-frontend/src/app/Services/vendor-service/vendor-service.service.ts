import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  constructor(private _http:HttpClient) { }

  addService(data:any):Observable<any> {
    return this._http.post('http://localhost:3000/Services',data);
  }

  getService() {
    return this._http.get('http://localhost:3000/Services');
  }
}

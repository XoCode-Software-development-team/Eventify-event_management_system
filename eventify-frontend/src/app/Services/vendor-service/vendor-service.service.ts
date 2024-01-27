import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  constructor(private _http:HttpClient) { }

  getServiceList(){
    return this._http.get('http://localhost:3000/services');
  }

  getCategoriesList() : Observable<string[]>{
    return this._http.get<string[]>('https://localhost:7164/api/service');
  }
}
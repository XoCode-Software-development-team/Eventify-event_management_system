import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/Pages/admin-service/admin-service.component';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  baseApiurl: string = baseUrl.baseApiUrl;

  constructor(private _http:HttpClient) { }

  getServiceList(){
    return this._http.get('http://localhost:3000/services');
  }

  getCategoriesList(){
    return this._http.get('http://localhost:3000/categories');
  }
}
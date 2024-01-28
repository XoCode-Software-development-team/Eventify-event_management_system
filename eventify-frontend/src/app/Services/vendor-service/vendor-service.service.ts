import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  constructor(private _http:HttpClient) { }

  private Url:string = baseApiUrl.Url;

  getServiceList(){
    return this._http.get('http://localhost:3000/services');
  }

  getCategoriesList() : Observable<string[]>{
    return this._http.get<string[]>(`${this.Url}/api/service`);
  }
}
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

  // admin-service-page

  getServiceListByCategory(category:string) : Observable<any>{
    return this._http.get<any>(this.Url+"/api/service/"+category);
  }

  getCategoriesList() : Observable<string[]>{
    return this._http.get<string[]>(`${this.Url}/api/service`);
  }

  deleteService(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/service/${id}`);
  }

  changeSuspendState(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/service/${id}`,null);
  }

  // admin-delete-request-page

  getCategoriesListOfDeleteRequest() : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequest`);
  }

  getServiceListOfDeleteRequest(category:string) : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequest/${category}`);
  }

  deleteServiceFromVendorRequest(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/deleteRequest/${id}`);
  }

  removeServiceFromVendorRequest(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/deleteRequest/${id}`,null);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Interfaces/interfaces';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }

  private Url:string = baseApiUrl.Url;

  getCategoriesList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/service/categories`);
  }

  getServiceListByCategory(categoryId:string) : Observable<any>{
    return this._http.get<any>(this.Url+"/api/service/"+categoryId);
  }

  changeSuspendState(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/service/${id}`,null);
  }

  deleteService(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/service/${id}`);
  }

  getCategoriesListOfDeleteRequest() : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequestServices`);
  }

  getServiceListOfDeleteRequest(categoryId:string) : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequestServices/${categoryId}`);
  }

  removeServiceFromVendorRequest(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/deleteRequestServices/${id}`,null);
  }

  deleteServiceFromVendorRequest(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/deleteRequestServices/${id}`);
  }

  getCategoriesListByVendor(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/service/categories/${id}`);
  }

  RequestToDelete(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/service/deleteRequest/${id}`,null);
  }

  getVendorServiceListByCategory(categoryId: string, vendorId: string): Observable<any> {
    return this._http.get<any>(`${this.Url}/api/vendorService/${categoryId}/${vendorId}`);
  }  

  getServiceCategoriesOfBookedServices(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookedService/categories/${id}`);
  }

  getBookedServicesOfVendor(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookedService/${categoryId}/${vendorId}`);
  }

  getCategoriesOfBookingRequest(vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest/${vendorId}`);
  }

  getServicesOfBookingRequest(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest/${categoryId}/${vendorId}`);
  }

  bookServiceByVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestApprove/${eventId}/${soRId}`,null);
  }

  rejectServiceFromVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestReject/${eventId}/${soRId}`,null);
  }

  getPriceModelsList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/service/priceModels`);
  }

}
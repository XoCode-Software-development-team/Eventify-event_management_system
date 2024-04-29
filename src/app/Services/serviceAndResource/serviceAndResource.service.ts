import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Interfaces/interfaces';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceAndResourceService {

  constructor(private _http:HttpClient) { }

  private Url:string = baseApiUrl.Url;

  // Get all categories
  getCategoriesList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/service/categories`);
  }

  // Get services of category Id
  getServiceListByCategory(categoryId:string) : Observable<any>{
    return this._http.get<any>(this.Url+"/api/service/"+categoryId);
  }

  // Toggle the suspend state of service
  changeSuspendState(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/service/${id}`,null);
  }

  // Delete the service
  deleteService(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/service/${id}`);
  }

  // Categories of delete requested services
  getCategoriesListOfDeleteRequest() : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequestServices`);
  }

  // Delete requested services by category
  getServiceListOfDeleteRequest(categoryId:string) : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/deleteRequestServices/${categoryId}`);
  }

  // Remove delete request
  removeServiceFromVendorRequest(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/deleteRequestServices/${id}`,null);
  }

  // Delete delete requested service 
  deleteServiceFromVendorRequest(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/deleteRequestServices/${id}`);
  }

  // Get category list of vendor
  getCategoriesListByVendor(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/service/categories/${id}`);
  }

  // Vendor request to delete service
  RequestToDelete(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/service/deleteRequest/${id}`,null);
  }

  // Get service list by category of vendor
  getVendorServiceListByCategory(categoryId: string, vendorId: string): Observable<any> {
    return this._http.get<any>(`${this.Url}/api/vendorService/${categoryId}/${vendorId}`);
  }  

  // Get categories of booked services of vendor
  getServiceCategoriesOfBookedServices(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookedService/categories/${id}`);
  }

  // Get Booked services by category of vendor
  getBookedServicesOfVendor(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookedService/${categoryId}/${vendorId}`);
  }

  // Get Category list of booking request services of vendor
  getCategoriesOfBookingRequest(vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest/${vendorId}`);
  }

  // Get Booking requested services by category of vendor
  getServicesOfBookingRequest(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest/${categoryId}/${vendorId}`);
  }

  // Approve the booking request by vendor
  bookServiceByVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestApprove/${eventId}/${soRId}`,null);
  }

  // Reject the booking request by vendor
  rejectServiceFromVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestReject/${eventId}/${soRId}`,null);
  }

  // Get All price models
  getPriceModelsList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/service/priceModels`);
  }

  // Add new Service by vendor
  addNewService(vendorId:string, data:any): Observable<any> {
    return this._http.post<any>(`${this.Url}/api/service/addNew/${vendorId}`,data);
  }

    // Update the service by vendor
  updateService(vendorId:string,soRId:number, data:any): Observable<any> {
    return this._http.put<any>(`${this.Url}/api/service/update/${vendorId}/${soRId}`,data);
  }

  // Get max price of service according to provided price model
  getMaxPriceOfService(modelId:any):Observable<any> {
    return this._http.get<any>(`${this.Url}/api/service/maxPrice/${modelId}`);
  }

  // Get all Services for service card
  getServicesForClients():Observable<any> {
    return this._http.get<any>(`${this.Url}/api/service/all`);
  }

  // Get Details of service
  getServiceDetailsForClient(soRId:number):Observable<any> {
    return this._http.get<any>(`${this.Url}/api/service/details/${soRId}`);
  }

}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Interfaces/interfaces';
import { baseApiUrl } from 'src/environments/environment';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ServiceAndResourceService {

  constructor(private _http:HttpClient,private _location: Location) { }

  private Url:string = baseApiUrl.Url;

  checkUrlString(): string {
    const currentUrl = this._location.path();
    const serviceUrlPattern = /\/services\b/i; // Pattern for service URLs
    const resourceUrlPattern = /\/resources\b/i; // Pattern for resource URLs

    if (serviceUrlPattern.test(currentUrl)) {
      return 'service';
    } else if (resourceUrlPattern.test(currentUrl)) {
      return 'resource';
    } else {
      console.log('Unknown URL');
      return ''
    }
  }

  // Get all categories
  getCategoriesList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/${this.checkUrlString()}/categories`);
  }

  // Get services or resource of category Id
  getServiceAndResourceListByCategory(categoryId:string) : Observable<any>{
    return this._http.get<any>(this.Url+`/api/${this.checkUrlString()}/`+categoryId);
  }

  // Toggle the suspend state of service
  changeSuspendState(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/${this.checkUrlString()}/${id}`,null);
  }

  // Delete the service or resource
  deleteServiceAndResource(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/${this.checkUrlString()}/${id}`);
  }

  // Categories of delete requested services or resources
  getCategoriesListOfDeleteRequest() : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/${this.checkUrlString()}/deleteRequest`);
  }

  // Delete requested services or resource by category
  getServiceAndResourceListOfDeleteRequest(categoryId:string) : Observable<String[]>{
    return this._http.get<string[]>(`${this.Url}/api/${this.checkUrlString()}/deleteRequest/${categoryId}`);
  }

  // Remove delete request
  removeServiceAndResourceFromVendorRequest(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/${this.checkUrlString()}/deleteRequest/change/${id}`,null);
  }

  // Delete delete requested service or resource
  deleteServiceAndResourceFromVendorRequest(id:string): Observable<any> {
    return this._http.delete(`${this.Url}/api/${this.checkUrlString()}/deleteRequestApprove/${id}`);
  }

  // Get category list of vendor
  getCategoriesListByVendor(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/${this.checkUrlString()}/categories/${id}`);
  }

  // Vendor request to delete service
  RequestToDelete(id: string) : Observable<any>{
    return this._http.put<any>(`${this.Url}/api/${this.checkUrlString()}/deleteRequest/${id}`,null);
  }

  // Get service or resource list by category of vendor
  getVendorServiceAndResourceListByCategory(categoryId: string, vendorId: string): Observable<any> {
    return this._http.get<any>(`${this.Url}/api/vendor${this.checkUrlString()}/${categoryId}/${vendorId}`);
  }  

  // Get categories of booked services of vendor
  getServiceAndResourceCategoriesOfBookedServices(id:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/booked${this.checkUrlString()}/categories/${id}`);
  }

  // Get Booked services by category of vendor
  getBookedServiceAndResourcesOfVendor(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/booked${this.checkUrlString()}/${categoryId}/${vendorId}`);
  }

  // Get Category list of booking request services of vendor
  getCategoriesOfBookingRequest(vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest${this.checkUrlString()}/${vendorId}`);
  }

  // Get Booking requested services by category of vendor
  getServicesAndResourcesOfBookingRequest(categoryId:string, vendorId:string):Observable<any> {
    return this._http.get<string[]>(`${this.Url}/api/bookingRequest${this.checkUrlString()}/${categoryId}/${vendorId}`);
  }

  // Approve the booking request by vendor
  bookServiceAndResourceByVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestApprove${this.checkUrlString()}/${eventId}/${soRId}`,null);
  }

  // Reject the booking request by vendor
  rejectServiceAndResourceFromVendor(eventId:string,soRId: string):Observable<any> {
    return this._http.put<string[]>(`${this.Url}/api/bookingRequestReject${this.checkUrlString()}/${eventId}/${soRId}`,null);
  }

  // Get All price models
  getPriceModelsList() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/service/priceModels`);
  }

  getPriceModelsListOfServicesAndResources() : Observable<Category[]>{
    return this._http.get<Category[]>(`${this.Url}/api/${this.checkUrlString()}/priceModels/available`);
  }

  // Add new Service or Resource by vendor
  addNewServiceAndResource(vendorId:string, data:any): Observable<any> {
    return this._http.post<any>(`${this.Url}/api/${this.checkUrlString()}/addNew/${vendorId}`,data);
  }

    // Update the service or resource by vendor
  updateServiceAndResource(vendorId:string,soRId:number, data:any): Observable<any> {
    return this._http.put<any>(`${this.Url}/api/${this.checkUrlString()}/update/${vendorId}/${soRId}`,data);
  }

  // Get max price of service/resource according to provided price model
  getMaxPriceOfServiceAndResource(modelId:any):Observable<any> {
    return this._http.get<any>(`${this.Url}/api/${this.checkUrlString()}/maxPrice/${modelId}`);
  }

  // Get all Services/Resources for service/resource card
  getServicesAndResourcesForClients(params: { page: number; pageSize: number; sortBy: string; filters: any }): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString())
      .set('sortBy', params.sortBy);

    if (params.filters.price) {
      httpParams = httpParams
        .set('minPrice', params.filters.price.minValue?.toString() || '')
        .set('maxPrice', params.filters.price.maxValue?.toString() || '')
        .set('modelId', params.filters.price.modelId?.toString() || '');
    }

    if (params.filters.categories && params.filters.categories.length > 0) {
      httpParams = httpParams.set('categories', params.filters.categories.join(','));
    }

    if (params.filters.rate !== null) {
      httpParams = httpParams.set('rate', params.filters.rate.toString());
    }

    return this._http.get<any>(`${this.Url}/api/${this.checkUrlString()}/all`, { params: httpParams });
  }

  // Get Details of service/resource
  getServiceAndResourceDetailsForClient(soRId:number):Observable<any> {
    return this._http.get<any>(`${this.Url}/api/${this.checkUrlString()}/details/${soRId}`);
  }

  getRatingCount():Observable<any> {
    return this._http.get<any>(`${this.Url}/api/${this.checkUrlString()}/ratingCount`);
  }
}
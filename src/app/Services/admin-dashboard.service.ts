import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = baseApiUrl.Url+'/api/adminDashboard';


  constructor(private _http:HttpClient) { }

  getAllClients() {
    return this._http.get(`${this.apiUrl}/clients`);
  }

  getAllVendors() {
    return this._http.get(`${this.apiUrl}/vendors`);
  }
}

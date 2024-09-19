import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorFollowService {
  private Url: string = baseApiUrl.Url;
  private apiUrl = this.Url+'/api/VendorFollow';

  constructor(private _http:HttpClient) { }

  isFollow(soRId:number) {
    return this._http.get(`${this.apiUrl}/isFollow/${soRId}`);
  }

  toggleFollow(soRId:number) {
    return this._http.put(`${this.apiUrl}/isFollow/${soRId}`,null);
  }
}

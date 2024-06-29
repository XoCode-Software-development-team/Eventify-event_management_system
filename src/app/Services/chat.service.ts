import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = baseApiUrl.Url+'/api/chat';


  constructor(private _http:HttpClient) { }

  getPhoneNumber(soRId:number) {
    return this._http.get(`${this.apiUrl}/${soRId}`);
  }
}

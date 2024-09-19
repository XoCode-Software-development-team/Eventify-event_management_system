import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ResetPassword } from '../Models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private Url: string = baseApiUrl.Url;

  constructor(private _http: HttpClient) {}

  sendResetPasswordLink(email: string): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.Url}/api/authentication/SendResetEmail/${email}`,null);
  }

  resetPassword(resetPasswordObj:ResetPassword){
    return this._http.post(`${this.Url}/api/authentication/resetPassword`,resetPasswordObj);
  }
}

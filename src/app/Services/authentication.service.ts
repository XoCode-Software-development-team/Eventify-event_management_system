import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../Models/token-api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private Url: string = baseApiUrl.Url;
  private userPayload: any;

  constructor(private _http: HttpClient, private _router: Router) {
    this.userPayload = this.decodedToken();
  }

  clientSignUp(userObj: any) {
    return this._http.post(
      `${this.Url}/api/authentication/clientRegister`,
      userObj
    );
  }

  vendorSignUp(userObj: any) {
    return this._http.post(
      `${this.Url}/api/authentication/vendorRegister`,
      userObj
    );
  }

  adminSignUp() {
    return this._http.post(
      `${this.Url}/api/authentication/adminRegister`,
      null
    );
  }

  login(userObj: any) {
    return this._http.post(
      `${this.Url}/api/authentication/authenticate`,
      userObj
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.removeItem('token');
    // Navigate to the login page and wait for the navigation to complete
    this._router
      .navigate(['login'])
      .then(() => {
        // Optional: Perform any additional actions after navigation
      })
      .catch((err) => {
        console.error('Navigation error:', err);
      });
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    //Convert string to boolean
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getUserNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  getIdFromToken() {
    if (this.userPayload) {
      return this.userPayload.id;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this._http.post<any>(
      `${this.Url}/api/authentication/refresh`,
      tokenApi
    );
  }
}

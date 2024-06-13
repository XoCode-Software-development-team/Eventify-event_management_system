import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vendor {
  category: string;
  vendorName: string;
  images: string[];
  features: string[];
  photos: string[];
  prices: string;
  location: string;
  ratings: string;
  userManuals: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'https://localhost:5100/api/vendor';

  constructor(private http: HttpClient) { }


  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }
}

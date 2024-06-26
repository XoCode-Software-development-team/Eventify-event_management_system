// src/app/services/map.service.ts
import { Injectable } from '@angular/core';
import { baseApiUrl, environment, mapEnvironment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiUrl = `${baseApiUrl.Url}/api/location`
  private apiLoaded = false;

  constructor(private _http:HttpClient) {}

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.apiLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapEnvironment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.apiLoaded = true;
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };

      document.head.appendChild(script);
    });
  }

  getLocations(item: string, query: string) {
    const params = { query }; // Create an object with query parameter
    return this._http.get(`${this.apiUrl}/${item}`, { params });
  }
  
}

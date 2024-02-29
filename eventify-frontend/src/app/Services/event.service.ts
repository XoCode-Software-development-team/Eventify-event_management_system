import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  postData(formData: any) {
    return this.http.post('http://localhost:5000/event', formData);
  }
}

// src/app/shared/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7128/api/Event';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetEvent`);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddEvent`, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/UpdateEvent/${eventId}`, eventData);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteEvent/${eventId}`);
  }
}

// src/app/shared/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private Url: string = baseApiUrl.Url;
  private apiUrl = this.Url+'/api/Event';
  private eventAdded = new Subject<void>();

  eventAdded$ = this.eventAdded.asObservable();

  announceEventAdded() {
    this.eventAdded.next();
  }

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetEvent`);
  }

  getPastEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetPastEvent`);
  }

  getEventById(eventId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetEvent/${eventId}`);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddEvent`, eventData);
  }

  updateEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateEvent/${eventId}`, eventData);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteEvent/${eventId}`);
  }

  getAllEventBySoRId(soRId:number) {
    return this.http.get(`${this.apiUrl}/getEvents/${soRId}`);
  }

  addServiceResourceToEvent(soRId:number,eventList:any) {
    return this.http.post<any>(`${this.apiUrl}/AddServiceResource/${soRId}`, eventList);
  }
}

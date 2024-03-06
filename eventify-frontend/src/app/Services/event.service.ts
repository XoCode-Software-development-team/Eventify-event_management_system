import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  postData(formData: any) {
    return this.http.post('http://localhost:7160/Events', formData)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          if (error.status === 0) {
            console.error('Empty response. Server might be down.');
          }
          return throwError(error);
        })
      );
  }

  
}

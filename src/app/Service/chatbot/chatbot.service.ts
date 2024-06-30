import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'https://localhost:7193/api/ChatBot/sendMessage';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error appropriately
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }
}

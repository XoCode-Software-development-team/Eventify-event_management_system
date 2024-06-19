import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckList, CheckListTask, Description } from '../Pages/client/checklist/checklist.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistAgendaService {

  private baseUrl = 'https://localhost:793/api/CheckList'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  createCheckList(checkList: CheckList): Observable<CheckList> {
    return this.http.post<CheckList>(this.baseUrl, checkList, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createCheckListTask(checkListId: number, task: CheckListTask): Observable<CheckListTask> {
    return this.http.post<CheckListTask>(`${this.baseUrl}/${checkListId}/tasks`, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createDescription(checkListId: number, description: Description): Observable<Description> {
    return this.http.post<Description>(`${this.baseUrl}/${checkListId}/descriptions`, description, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

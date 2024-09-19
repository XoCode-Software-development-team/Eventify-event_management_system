import { Injectable } from '@angular/core';
import { Agenda, Checklist } from '../Interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../Components/event-dialog/event-dialog.component';
import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChecklistAgendaService {
  private apiUrl = baseApiUrl.Url+'/api';

  checklistKey: string = 'checklist';
  agendaKey: string = 'agenda';

  constructor(private _dialog: MatDialog,private _http:HttpClient) {}

  saveChecklist(checklist: Checklist) {
    localStorage.setItem(this.checklistKey, JSON.stringify(checklist));
  }

  saveAgenda(agenda: Agenda) {
    localStorage.setItem(this.agendaKey, JSON.stringify(agenda));
  }

  getChecklist(): Checklist | null {
    const checklistJson = localStorage.getItem(this.checklistKey);
    if (checklistJson) {
      const checklist: Checklist = JSON.parse(checklistJson);
      return checklist;
    }
    return null;
  }

  getAgenda(): Agenda | null {
    const AgendaJson = localStorage.getItem(this.agendaKey);
    if (AgendaJson) {
      const agenda: Agenda = JSON.parse(AgendaJson);
      return agenda;
    }
    return null;
  }

  removeChecklist(): void {
    localStorage.removeItem(this.checklistKey);
  }

  removeAgenda(): void {
    localStorage.removeItem(this.agendaKey);
  }

  getChecklistEvents() {
    return this._http.get(`${this.apiUrl}/checklist/checklistEvents`);
  }

  getAgendaEvents() {
    return this._http.get(`${this.apiUrl}/agenda/agendaEvents`);
  }

  saveChecklistInDatabase(checklist:Checklist,eventId:number){
    return this._http.post(`${this.apiUrl}/checklist/saveChecklist/${eventId}`,checklist);
  }

  saveAgendaInDatabase(agenda:Agenda,eventId:number){
    return this._http.post(`${this.apiUrl}/agenda/saveAgenda/${eventId}`,agenda);
  }

  getChecklistFromDatabase(eventId:number){
    return this._http.get(`${this.apiUrl}/checklist/${eventId}`);
  }

  getAgendaFromDatabase(eventId:number){
    return this._http.get(`${this.apiUrl}/agenda/${eventId}`);
  }

  UpdateChecklistInDatabase(checklist:Checklist,checklistId:number){
    return this._http.put(`${this.apiUrl}/checklist/updateChecklist/${checklistId}`,checklist);
  }

  UpdateAgendaInDatabase(agenda:Agenda,agendaId:number){
    return this._http.put(`${this.apiUrl}/agenda/updateAgenda/${agendaId}`,agenda);
  }
}

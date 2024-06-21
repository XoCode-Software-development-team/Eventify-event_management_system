import { Injectable } from '@angular/core';
import { Checklist } from '../Interfaces/interfaces';
import { Agenda } from '../Pages/client/agenda/agenda.component';

@Injectable({
  providedIn: 'root',
})
export class ChecklistAgendaService {
  checklistKey: string = 'checklist';
  agendaKey: string = 'agenda';

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
}

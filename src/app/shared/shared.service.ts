import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventUpdateService {

  private isUpdateFormActiveSource = new BehaviorSubject<boolean>(false);
  isUpdateFormActive$ = this.isUpdateFormActiveSource.asObservable();

  private currentEventSource = new BehaviorSubject<any>(null);
  currentEvent$ = this.currentEventSource.asObservable();

  constructor() { }

  setIsUpdateFormActive(isActive: boolean) {
    this.isUpdateFormActiveSource.next(isActive);
  }
  setCurrentEvent(Selectedevent: any) {
    this.currentEventSource.next(Selectedevent);
  }

  resetFormState() {
    this.isUpdateFormActiveSource.next(false);
    this.currentEventSource.next('');
  }
}


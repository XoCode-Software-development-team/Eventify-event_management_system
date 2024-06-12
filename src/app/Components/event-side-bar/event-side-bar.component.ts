import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventUpdateService } from '../../shared/shared.service';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-event-side-bar',
  templateUrl: './event-side-bar.component.html',
  styleUrls: ['./event-side-bar.component.scss']
})
export class EventSideBarComponent implements OnInit {

  showEventsList: boolean = false;
  panelOpenState = false;
  eventArray: any[] = [];
  isResultLoaded = false;

  constructor(
    private router: Router,
    private updateService: EventUpdateService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((resultData: any[]) => {
      this.isResultLoaded = true;
      this.eventArray = resultData;
    });
  }

  toggleEventsList(): void {
    this.showEventsList = !this.showEventsList;
  }

  goToEventDetails(Id: number): void {
    this.router.navigate(['/client/event/view', Id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  onCreateButtonClick() {
    this.updateService.resetFormState();
  }
}

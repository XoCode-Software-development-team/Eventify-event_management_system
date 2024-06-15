import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-side-bar',
  templateUrl: './event-side-bar.component.html',
  styleUrls: ['./event-side-bar.component.scss'],
})
export class EventSideBarComponent implements OnInit, OnDestroy {

  showEventsList: boolean = false;
  panelOpenState = false;
  eventArray: any[] = [];
  isResultLoaded = false;
  eventsLoading:boolean = false;
  private eventSubscription!: Subscription;


  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getAllEvents();

    this.eventSubscription = this.eventService.eventAdded$.subscribe(() => {
      this.getAllEvents();
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  getAllEvents() {
    this.eventsLoading = true;
    this.eventService.getAllEvents().subscribe((resultData: any[]) => {
      this.isResultLoaded = true;
      this.eventArray = resultData;
      // console.log(resultData)
      this.eventsLoading = false;
    });
  }

  toggleEventsList(): void {
    this.showEventsList = !this.showEventsList;
  }

  goToEventDetails(): void {
      window.scrollTo(0, 0);
  }

  onCreateButtonClick() {
    this.showEventsList = false;
  }
}

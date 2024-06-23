import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../Services/event.service';
import { ToastService } from '../../Services/toast.service'; // Corrected import path

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  allEvents: any[] = [];
  selectedEvent: any;
  isUpdateFormActive = false;
  isLoading: boolean = false;
  eventId!:number;

  Scards: any[] = [];
  Rcards: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private eventService: EventService,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = Number(params.get('id'));
      this.getEventById(this.eventId);
    });
  }

  getEventById(eventId: number): void {
    this.isLoading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (res: any) => {
        // console.log(res)
        if (res != null && res.length > 0) { // Check if result is not null and contains data
          this.selectedEvent = res[0];
          // console.log(res);
          this.Scards = this.selectedEvent.services;
          this.Rcards = this.selectedEvent.resources;
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this._toast.showMessage(err.message || 'Error fetching event', 'error');
        this.isLoading = false;
      }
    });
  }

  setDelete(eventId: number): void {
    this.isLoading = true;
    this.eventService.deleteEvent(eventId).subscribe({
      next: (res: any) => {
        this._toast.showMessage(res.message, 'success');
        if (res.nextEventId != 0) {
          this.router.navigate(['/event/view', res.nextEventId]).then(() => {
            window.scrollTo(0, 0);
            this.eventService.announceEventAdded();
            this.isLoading = false;
          });
        } else {
          this.router.navigate(['event/create']).then(() => {
            this.isLoading = false;
          });
        }
      },
      error: (err: any) => {
        this._toast.showMessage(err.message, 'error');
        this.isLoading = false;
      }
    });
  }

  hasEventServiceCards(): boolean {
    return this.Scards && this.Scards.length > 0;
  }

  hasEventResourceCards(): boolean {
    return this.Rcards && this.Rcards.length > 0;
  }

  updateEvent(eventId: number): void {
    this.router.navigate(['/event/update', eventId]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}

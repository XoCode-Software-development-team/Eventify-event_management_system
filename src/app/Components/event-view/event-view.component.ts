import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventUpdateService } from '../../shared/shared.service';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  allEvents: any[] = [];
  selectedEvent: any;
  isUpdateFormActive = false;

  Scards: any[] = [1];
  Rcards: any[] = [1];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private updateService: EventUpdateService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.allEvents = events;
      this.route.paramMap.subscribe(params => {
        const eventId = Number(params.get('id'));
        this.selectedEvent = this.allEvents.find(event => event.id === eventId);
      });
    });
  }

  setDelete(eventId: number): void {
    if (window.confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        alert("Event Deleted Successfully");
        this.selectedEvent = null;
        const selectedIndex = this.allEvents.findIndex(event => event.id === eventId);

        const previousIndex = selectedIndex - 1;
        if (previousIndex >= 0) {
          const previousEventId = this.allEvents[previousIndex].id;
          this.router.navigate(['client/event/view', previousEventId]).then(() => {
            this.location.back();
            window.scrollTo(0, 0);
            location.reload(); 
          });
        } else {
          this.router.navigate(['client/event/create']).then(() => {
            this.location.back();
          });
        }
      });
    }
  }

  viewAgenda() {
    console.log('View agenda!');
  }

  viewChecklist() {
    console.log('View checklist!');
  }

  hasEventServiceCards(): boolean {
    return this.Scards && this.Scards.length > 0;
  }

  hasEventResourceCards(): boolean {
    return this.Rcards && this.Rcards.length > 0;
  }

  updateEvent(eventId: number): void {
    this.updateService.setIsUpdateFormActive(true);
    this.updateService.setCurrentEvent(eventId);
    this.router.navigate(['/client/event/update', eventId]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}

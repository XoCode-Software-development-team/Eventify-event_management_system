import { Component } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { ReviewRatingService } from 'src/app/Services/review-rating.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  allEvents: any[] = [];
  topRatedVendors:any[] = []
  isLoading: boolean = false;

  constructor(private eventService: EventService,private reviewService:ReviewRatingService) {}

  ngOnInit(): void {
    this.fetchEventDetails();
    this.getTopRatedVendors();
  }

  fetchEventDetails(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe(
      allEvents => {
        const eventPromises = allEvents.map(event => {
          return this.eventService.getEventById(event.eventId).toPromise();
        });

        Promise.all(eventPromises).then(events => {
          this.allEvents = events.map(event => {
            if (event && event.length > 0) {
              return {
                id: event[0].eventId,
                name: event[0].name,
                location: event[0].location,
                date: new Date(event[0].startDateTime)
              };
            }
            return null;
          }).filter(event => event !== null);

          // Sort events by date (ascending)
          this.allEvents.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

          this.isLoading = false;
        });
      },
      error => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
      }
    );
  }

    // Method to parse rate to a number
    parseRate(rate: string | number | null | undefined): number | null {
      if (rate == null) return null; // Return null if rate is null or undefined
      return parseFloat(rate.toString()); // Parse rate to a number and return
    }

    getTopRatedVendors() {
      this.reviewService.getTopRatedVendors().subscribe({
        next:(res:any) => {
          console.log(res)
          this.topRatedVendors = res;
        },
        error:(err:any) => {
          console.log(err);
        }
      })
    }
}

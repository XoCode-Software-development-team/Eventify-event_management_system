import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventUpdateService } from '../../shared/shared.service';



@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent {




  allEvents: any[] = [];
  selectedEvent: any;
  isUpdateFormActive = false;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private location: Location, private updateService: EventUpdateService ) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7128/api/Event/GetEvent').subscribe(events => {
      this.allEvents = events;
      this.route.paramMap.subscribe(params => {
        const eventId = Number(params.get('id'));
        this.selectedEvent = this.allEvents.find(event => event.id === eventId);
      });
    });
  }



  
  setDelete(eventId: number): void {
    if (window.confirm('Are you sure you want to delete this event?')) {
      this.http.delete(`https://localhost:7128/api/Event/DeleteEvent/${eventId}`).subscribe(() => {
        alert("Event Deleted Successfully");
        this.selectedEvent = null;
        const selectedIndex = this.allEvents.findIndex(event => event.id === eventId);
  
        const previousIndex = selectedIndex - 1;
        if (previousIndex >= 0) {
          const previousEventId = this.allEvents[previousIndex].id;
          this.router.navigate(['client/event/view', previousEventId]).then(() => {
            this.location.go(this.location.path());
            window.scrollTo(0, 0);
            location.reload(); 
          });
        } else {
          this.router.navigate(['client/event/create']).then(() => {   // edit
            this.location.go(this.location.path());
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

  Scards: any[] = [1];
  Rcards: any[] = [1];


  hasEventServiceCards(): boolean {
    return this.Scards && this.Scards.length > 0;
  }
  hasEventResourceCards(): boolean {
    return this.Rcards && this.Rcards.length > 0;
  }




  updateEvent(eventId: number): void{
    this.updateService.setIsUpdateFormActive(true);
    this.updateService.setCurrentEvent(eventId);
    this.router.navigate(['/client/event/update',eventId]);


  }
 

}

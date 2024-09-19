import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { EventService } from 'src/app/Services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-event-calender',
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.scss']
})
export class EventCalenderComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventTimeFormat: { 
      hour: 'numeric',
      minute: '2-digit',
    },

    eventDidMount: function(info) {

      // Generate a random color
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
      // Set the background color
      info.el.style.backgroundColor = randomColor;
      info.el.style.borderColor = 'white';
      
    },

    eventMouseEnter: function(info) {
      info.el.style.cursor = 'pointer';
    },
    eventMouseLeave: function(info) {
      info.el.style.cursor = '';
    },

 
     
  };

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEventDates();
  }

  fetchEventDates(): void {
    this.eventService.getAllEvents().subscribe(allEvents => {
      const eventPromises = allEvents.map(event => {
        return this.eventService.getEventById(event.eventId).toPromise();
      });
      Promise.all(eventPromises).then(events => {
       

const eventDates = events.map(event => {
  if (event && event.length > 0 && event[0].startDateTime && event[0].endDateTime) {
    return {
      title: event[0].name,
      start: new Date(event[0].startDateTime),
      end: new Date(event[0].endDateTime)
    };
  }
  return null; 
}).filter(event => event !== null); // Remove null entries


this.calendarOptions = {
  ...this.calendarOptions,
  events: eventDates as EventInput[] 
};

      });
    }, error => {
      console.error('Error fetching events:', error); // Log any error
    });
  }
}

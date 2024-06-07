import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { EventUpdateService } from '../../shared/shared.service';

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
  constructor(private http: HttpClient, private router: Router,private updateService: EventUpdateService) { }

  ngOnInit(): void {
    this.getAllEvent();
  }

  getAllEvent() {
    this.http.get("https://localhost:7128/api/Event/GetEvent")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.eventArray = resultData;
      });
  }

  toggleEventsList(): void {
    this.showEventsList = !this.showEventsList;
  }

  goToEventDetails(Id: number): void {
    this.router.navigate(['/client/event/view', Id]);
  }

  onCreateButtonClick() {
    this.updateService.resetFormState();
  }

}


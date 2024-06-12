import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-service-res-card',
  templateUrl: './event-service-res-card.component.html',
  styleUrls: ['./event-service-res-card.component.scss']
})
export class EventServiceResCardComponent {
  @Input() dataSource:any;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-event-service-res-card',
  templateUrl: './event-service-res-card.component.html',
  styleUrls: ['./event-service-res-card.component.scss'],
})
export class EventServiceResCardComponent {
  @Input() dataSource: any;
  @Input() eventId!: number;
  @Output() refreshEvent: EventEmitter<any> = new EventEmitter<any>();
  isLoading: { [key: number]: boolean } = {};

  constructor(
    private _eventService: EventService,
    private _toast: ToastService
  ) {}

  remove(serviceResourceId: number) {
    this.isLoading[serviceResourceId] = true;
    const updateEventServiceResource = {
      Removed: [this.eventId],
    };
    this._eventService
      .addServiceResourceToEvent(serviceResourceId, updateEventServiceResource)
      .subscribe({
        next: (res:any) => {
          // console.log(res);
          this._toast.showMessage('Removed successfully!', 'success');
          this.refreshEvent.emit();
          delete this.isLoading[serviceResourceId]; // Reset loading state on success
        },
        error: (err:any) => {
          // console.error(err);
          this._toast.showMessage('Please try again!', 'error');
          this.isLoading[serviceResourceId] = false; // Reset loading state on error
        },
      });
  }
}

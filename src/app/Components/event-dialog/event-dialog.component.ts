import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CapitalizePipe } from 'src/app/Pipes/capitalize.pipe';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EventService } from 'src/app/Services/event.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

interface Event {
  eventId: number;
  name: string;
  isInVendorSr: boolean;
  isPending: boolean;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  events = new FormControl<number[]>([]);
  eventList: Event[] = [];
  isLoading:boolean = false;
  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  okButton = {
    url: '',
    type: 'button',
    text: 'Save',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { soRId: number },
    private dialogRef: MatDialogRef<EventDialogComponent>,
    private eventService: EventService,
    private auth: AuthenticationService,
    private _router:Router,
    private _toast:ToastService,
    private _serviceAndResource:ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.getEventDetails();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.isLoading = true;
    const selectedEventIds = this.eventList
      .filter(event => !event.isInVendorSr && this.events.value?.includes(event.eventId))
      .map(event => event.eventId);

    const addedEventIds = this.eventList
      .filter(event => !event.isPending && selectedEventIds.includes(event.eventId))
      .map(event => event.eventId);

    const removedEventIds = this.eventList
      .filter(event => event.isPending && !selectedEventIds.includes(event.eventId))
      .map(event => event.eventId);

    const updateEventServiceResource = {
      Added: addedEventIds,
      Removed: removedEventIds
    };
    console.log(updateEventServiceResource)

    if (addedEventIds.length > 0 || removedEventIds.length > 0) {
      this.eventService.addServiceResourceToEvent(this.data.soRId,updateEventServiceResource).subscribe({
        next:(res:any) => {
          // console.log(res);
          if (addedEventIds.length > 0) {
            this._toast.showMessage(`${this.capitalizedTag} added successful!`,'success');
            this._router.navigate([`../../../event/view/${addedEventIds[0]}`]);
          } else {
            this._toast.showMessage(`${this.capitalizedTag} updated successful!`,'success');
            this._router.navigate([`../../../event/view/${removedEventIds[0]}`]);
          }
          this.isLoading = false;
          this.closeDialog();
        },
        error:(err:any) => {
          // console.error(err);
          this._toast.showMessage(`${this.capitalizedTag} updated failed!`,'error');
          this.isLoading = false;
        }
      })
    } else {
      this.closeDialog();
      this.isLoading = false;
    }
}

  getEventDetails(): void {
    this.isLoading = true;
    this.eventService.getAllEventBySoRId(this.data.soRId).subscribe({
      next: (res: any) => {
        this.eventList = res;
        const selectedEvents = this.eventList
          .filter(event => event.isInVendorSr || event.isPending)
          .map(event => event.eventId);
        this.events.setValue(selectedEvents);
        if (this.eventList != null && this.eventList.length <= 0) {
          this._router.navigate(['event']);
          this.closeDialog();
          this._toast.showMessage("Please create event first!",'info');
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  toggleEventSelection(event: any, eventId: number): void {
    const selectedValues = this.events.value as number[];
    if (event.checked) {
      if (!selectedValues.includes(eventId)) {
        this.events.setValue([...selectedValues, eventId]);
      }
    } else {
      this.events.setValue(selectedValues.filter(id => id !== eventId));
    }
  }

  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventUpdateService } from '../../shared/shared.service';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  styleUrls: ['./event-create-form.component.scss']
})
export class EventCreateFormComponent implements OnInit {
  formName = '';
  BtnName = '';
  form: FormGroup;
  eventArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentEventID = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private updateService: EventUpdateService,
    private eventService: EventService
  ) {
    this.form = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      guestCount: ['', Validators.required],
      coverImage: ['']
    });
  }

  ngOnInit(): void {
    this.updateService.isUpdateFormActive$.subscribe(isActive => {
      this.isUpdateFormActive = isActive;
      this.formName = isActive ? 'Update Event' : 'Create New Event';
      this.BtnName = isActive ? 'Update' : 'Create';
    });

    this.updateService.currentEvent$.subscribe(selectedEvent => {
      this.currentEventID = selectedEvent;
      if (this.isUpdateFormActive) {
        this.getAllEvents();
      } else {
        this.form.reset();
      }
    });
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((resultData: any[]) => {
      this.isResultLoaded = true;
      this.eventArray = resultData;
      if (this.isUpdateFormActive) {
        this.fillFormData();
      }
    });
  }

  register() {
    if (this.form.valid) {
      const bodyData = {
        eventName: this.form.value.eventName,
        description: this.form.value.description,
        eventDate: this.form.value.eventDate,
        location: this.form.value.location,
        startTime: this.form.value.startTime,
        endTime: this.form.value.endTime,
        guestCount: this.form.value.guestCount,
        coverImage: this.form.value.coverImage
      };

      this.eventService.addEvent(bodyData).subscribe((resultData: { id: any; }) => {
        alert('Event Registered Successfully');
        this.router.navigate(['/client/event/view', resultData.id]);
        this.form.reset();
        this.isUpdateFormActive = false;
      });
    } else {
      alert('Form is not valid. Please check your inputs.');
    }
  }

  fillFormData() {
    const selectedEvent = this.eventArray.find(event => event.id === this.currentEventID);

    if (selectedEvent) {
      this.form.patchValue({
        eventName: selectedEvent.eventName,
        description: selectedEvent.description,
        eventDate: selectedEvent.eventDate,
        location: selectedEvent.location,
        startTime: selectedEvent.startTime,
        endTime: selectedEvent.endTime,
        guestCount: selectedEvent.guestCount,
        coverImage: selectedEvent.coverImage
      });
    }
  }

  updateRecord() {
    if (this.form.valid) {
      const bodyData = {
        id: this.currentEventID,
        eventName: this.form.value.eventName,
        description: this.form.value.description,
        eventDate: this.form.value.eventDate,
        location: this.form.value.location,
        startTime: this.form.value.startTime,
        endTime: this.form.value.endTime,
        guestCount: this.form.value.guestCount,
        coverImage: this.form.value.coverImage
      };

      this.eventService.updateEvent(this.currentEventID, bodyData).subscribe({
        next: () => {
          alert('Event Updated Successfully');
          this.form.reset();
          this.isUpdateFormActive = false;
          this.router.navigate(['/client/event/view', this.currentEventID]);
        },
        error: (error: any) => {
          console.error('Error updating event:', error);
          alert('Failed to update event. Please try again.');
        }
      });
    } else {
      alert('Form is not valid. Please check your inputs.');
    }
  }

  save() {
    if (this.isUpdateFormActive) {
      this.updateRecord();
    } else {
      this.register();
    }
  }

  imageUrl: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}

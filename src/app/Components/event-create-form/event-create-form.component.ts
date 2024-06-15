import { Component, OnInit, Pipe, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../Services/event.service';
import { ToastService } from 'src/app/Services/toast.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  styleUrls: ['./event-create-form.component.scss'],
})
export class EventCreateFormComponent implements OnInit {

  formName = '';
  BtnName = '';
  form: FormGroup;
  eventArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentEventID!: number;
  imageUrl!: string;
  image!: File;
  file!: File;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private eventService: EventService,
    private _toast: ToastService,
    private _fireStorage: AngularFireStorage,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      guestCount: ['', Validators.required],
      thumbnail: [''],
    });
  }

  ngOnInit(): void {
    this._activateRoute.url.subscribe((url) => {
      const urlString = this._router.url;
      if (urlString.includes('/event/update/')) {
        this.isUpdateFormActive = true;
        this.formName = 'Update Event';
        this.BtnName = 'Update';
        this._activateRoute.paramMap.subscribe((params) => {
          const eventId = Number(params.get('id'));
          this.currentEventID = eventId;
          this.getEventById(eventId);
        });
      } else if (urlString.includes('/event/create')) {
        this.isUpdateFormActive = false;
        this.formName = 'Create New Event';
        this.BtnName = 'Create';
      }
    });
  }

  getEventById(eventId: number) {
    this.isLoading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (res: any) => {
        this.fillFormData(res[0]);
        this.isLoading = false;
      },
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((resultData: any[]) => {
      this.isResultLoaded = true;
      this.eventArray = resultData;
    });
  }

  async register() {
    this.isLoading = true;
    if (this.form.valid) {
      
      if (this.file) {
        await this.getFirebaseLink([this.file]);
      }

      const bodyData = {
        name: this.form.value.name,
        description: this.form.value.description,
        location: this.form.value.location,
        guestCount: this.form.value.guestCount,
        Thumbnail: this.imageUrl,
        startDateTime: this.combineDateAndTime(
          this.form.value.startDate,
          this.form.value.startTime
        ),
        endDateTime: this.combineDateAndTime(
          this.form.value.endDate,
          this.form.value.endTime
        ),
      };

      this.eventService.addEvent(bodyData).subscribe({
        next: async (res: any) => {
          this._toast.showMessage('Event create successfully!', 'success');
          if (res.eventId != null) {
            this.eventService.announceEventAdded();
            this.form.reset();
            this.isUpdateFormActive = false;
            window.scrollTo(0, 0);
            this.router.navigate(['/event/view', res.eventId]);
            this.isLoading = false;
          }
        },
        error: (err: any) => {
          // console.log(err);
          this._toast.showMessage(
            err.message || 'Event create failed',
            'error'
          );
          this.isLoading = false;
        },
      });
    } else {
      this._toast.showMessage(
        'Form is not valid. Please check your inputs.',
        'error'
      );
      this.isLoading = false;
    }
  }

  fillFormData(selectedEvent: any) {
    if (selectedEvent) {
      const startDate = new Date(selectedEvent.startDateTime);
      const endDate = new Date(selectedEvent.endDateTime);

      this.form.patchValue({
        name: selectedEvent.name,
        description: selectedEvent.description,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        location: selectedEvent.location,
        startTime: startDate.toTimeString().substr(0, 5),
        endTime: endDate.toTimeString().substr(0, 5),
        guestCount: selectedEvent.guestCount,
      });
      this.image = selectedEvent.thumbnail;
    }
  }

  async updateRecord() {
    this.isLoading = true;
    if (this.form.valid) {
      if (this.file != null) {
        await this.getFirebaseLink([this.file]);
      }

      const bodyData = {
        name: this.form.value.name,
        description: this.form.value.description,
        location: this.form.value.location,
        guestCount: this.form.value.guestCount,
        thumbnail: this.imageUrl,
        startDateTime: this.combineDateAndTime(
          this.form.value.startDate,
          this.form.value.startTime
        ),
        endDateTime: this.combineDateAndTime(
          this.form.value.endDate,
          this.form.value.endTime
        ),
      };

      this.eventService.updateEvent(this.currentEventID, bodyData).subscribe({
        next: (res: any) => {
          this._toast.showMessage('Event update successfully!', 'success');
          this.form.reset();
          this.isUpdateFormActive = false;
          this.router
            .navigate(['/event/view', this.currentEventID])
            .then(() => {
              window.scrollTo(0, 0);
            });
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(error);
          this._toast.showMessage(
            'Failed to update event. Please try again.',
            'error'
          );
          this.isLoading = false;
        },
      });
    } else {
      this._toast.showMessage(
        'Form is not valid. Please check your inputs.',
        'error'
      );
      this.isLoading = false;
    }
  }

  save() {
    if (this.isUpdateFormActive) {
      this.updateRecord();
    } else {
      this.register();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async getFirebaseLink(files: File[]) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `event-cover/${file.name}`;
        const uploadTask = await this._fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        this.imageUrl = url;
      }
    }
  }

  combineDateAndTime(date: string, time: string): Date {
    const datePart = new Date(date);
    const timeParts = time.split(':');
    datePart.setHours(+timeParts[0], +timeParts[1]);
    return datePart;
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}

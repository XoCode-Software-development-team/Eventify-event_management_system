import { Component, OnInit, Pipe, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
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
  form!: FormGroup;
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
  ) {}

  ngOnInit(): void {
    this.initializeForm();

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

  initializeForm() {
    const now = new Date();

    // Format today's date to YYYY-MM-DD
    const today = this.formatDate(now);

    // Set initial time to 00:00
    const initialTime = '00:00';

    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        startDate: [
          today,
          [Validators.required, dateGreaterThanTodayValidator()],
        ],
        endDate: [
          today,
          [Validators.required, dateGreaterThanTodayValidator()],
        ],
        location: ['', Validators.required],
        startTime: [initialTime, Validators.required],
        endTime: [initialTime, Validators.required],
        guestCount: [0, Validators.required],
        thumbnail: [''],
      },
      {
        Validators: [endDateGreaterThanOrEqualValidator()],
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  private convertToISODateTime(date: Date): string {
    return date.toISOString(); // Returns ISO 8601 formatted string
  }

  async register() {
    this.isLoading = true;
    if (this.form.valid) {
      if (this.file) {
        await this.getFirebaseLink([this.file]);
      }

      // Convert startDate and startTime to a JavaScript Date object
      const startDateTime = new Date(
        `${this.form.value.startDate}T${this.form.value.startTime}:00Z`
      );

      // Convert endDate and endTime to a JavaScript Date object
      const endDateTime = new Date(
        `${this.form.value.endDate}T${this.form.value.endTime}:00Z`
      );

      const bodyData = {
        name: this.form.value.name,
        description: this.form.value.description,
        location: this.form.value.location,
        guestCount: this.form.value.guestCount,
        Thumbnail: this.imageUrl,
        startDateTime: this.convertToISODateTime(startDateTime),
        endDateTime: this.convertToISODateTime(endDateTime),
      };

      console.log(bodyData);

      this.eventService.addEvent(bodyData).subscribe({
        next: async (res: any) => {
          // console.log(res)
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

      // Convert startDate and startTime to a JavaScript Date object
      const startDateTime = new Date(
        `${this.form.value.startDate}T${this.form.value.startTime}:00Z`
      );

      // Convert endDate and endTime to a JavaScript Date object
      const endDateTime = new Date(
        `${this.form.value.endDate}T${this.form.value.endTime}:00Z`
      );

      const bodyData = {
        name: this.form.value.name,
        description: this.form.value.description,
        location: this.form.value.location,
        guestCount: this.form.value.guestCount,
        Thumbnail: this.imageUrl,
        startDateTime: this.convertToISODateTime(startDateTime),
        endDateTime: this.convertToISODateTime(endDateTime),
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
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });

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

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}

export function dateGreaterThanTodayValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    // Set the time to 0:00:00 for a fair comparison
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = control.value ? new Date(control.value) : null;

    if (selectedDate) {
      // Set the time to 0:00:00 for a fair comparison
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        return { dateGreaterThanToday: { value: control.value } };
      }
    }
    return null;
  };
}

// Custom validator to check if endDate is greater than or equal to startDate
export function endDateGreaterThanOrEqualValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateLessThanStartDate: true };
    }
    return null;
  };
}

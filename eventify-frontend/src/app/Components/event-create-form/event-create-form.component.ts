import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EventService } from 'src/app/Services/event.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  styleUrls: ['./event-create-form.component.scss']
})

export class EventCreateFormComponent implements OnInit {
onDateInput($event: MatDatepickerInputEvent<any,any>) {
throw new Error('Method not implemented.');
}
  form!: FormGroup;
  successMessageVisible = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit() {
    this.form = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [''],
      location: ['',  Validators.required],
      description: [''],
      guestCount: ['', Validators.min(0)],
      image: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      // Assuming postData method in EventService sends data to the backend
      this.eventService.postData(formData).subscribe(response => {
        this.successMessageVisible = true;
        this.form.reset();
      }, error => {
        this.errorMessage = 'Failed to create event. Please try again.';
      });
    } else {
      console.error('Form is not valid.');
    }
  }
  
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage() {
    this.form.patchValue({ image: null });
  }
}
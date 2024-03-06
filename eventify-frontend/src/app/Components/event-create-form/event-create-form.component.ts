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
 

onDateInput(event: MatDatepickerInputEvent<any>) {
  // Implement your logic here
  console.log('Date selected:', event.value);
}
  form!: FormGroup;
  successMessageVisible = false;
  errorMessage!: string;
  formNotValid = false;

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit() {
    this.form = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [''],
      location: ['', Validators.required],
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
        console.error('Failed to create event. Please try again.');
        this.errorMessage = 'Failed to create event. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    } else {
      console.error('Form is not valid.');
      this.formNotValid = true; 
      setTimeout(() => {
        this.formNotValid = false;
      }, 3000);
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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  styleUrls: ['./event-create-form.component.scss']
})

export class EventCreateFormComponent implements OnInit {


  form: FormGroup = this.fb.group({
    eventName: ['',Validators.required],
    eventDate: ['',Validators.required],
    startTime: ['',Validators.required],
    endTime: [''],
    location: ['',Validators.required],
    description: [''],
    guestCount: [0,Validators.min(0)],
    image: [null],
  });

  successMessageVisible = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onDateInput(event: any) {
   console.log('eventDate:', event.value);
  }


  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      // Send data to JSON Server for testing
      this.http.post('http://localhost:3000/events', formData)
        .subscribe(
          (response) => {
            console.log('Data sent to JSON Server. Check http://localhost:3000/events', response);
            this.showSuccessMessage();
          },
          (error) => {
            console.error('Error sending data to JSON Server:', error);
            this.errorMessage = 'Error sending data to JSON Server.';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }

  

  showSuccessMessage() {
    this.successMessageVisible = true;
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 3000);
  }



  onImageSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.patchValue({
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onDeleteImage() {
    this.form.patchValue({
      image: null,
    });
  }

  
}


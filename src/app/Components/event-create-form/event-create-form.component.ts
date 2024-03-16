import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  styleUrls: ['./event-create-form.component.scss']
})
export class EventCreateFormComponent implements OnInit{

  
  form: FormGroup;
  eventArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentEventID = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private location: Location) {
    this.form = this.fb.group({
      eventName: ['', Validators.required],       //edit
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

  register() {
    if (this.form.valid) {
      let bodyData = {
        "eventName": this.form.value.eventName,    //edit
        "description": this.form.value.description,
        "eventDate": this.form.value.eventDate,
        "location": this.form.value.location,
        "startTime": this.form.value.startTime,
        "endTime": this.form.value.startTime,
        "guestCount": this.form.value.guestCount,
        "coverImage":this.form.value.coverImage
      };

      this.http.post("https://localhost:7128/api/Event/AddEvent", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Event Registered Successfully")
        const newEventId = resultData.id;
        this.router.navigate(['/view', newEventId]);
        this.getAllEvent();
        this.form.reset();
        this.location.go(this.location.path());
        location.reload(); 
      });

    }else {
      alert("Form is not valid. Please check your inputs.");
  }

    
  }

//-----------------------------------------------------------------------------------------

  setUpdate(data: any) {
    this.form.patchValue({
      eventName: data.eventName,             //edit
      description: data.description,
      eventDate: data.eventDate, 
      location: data.location, 
      startTime: data.startTime, 
      endTime: data.endTime, 
      guestCount: data.guestCount, 
    });
    this.currentEventID = data.id;
    this.isUpdateFormActive = true;
  }

  
  updateRecord() {
    if (this.form.valid) {
      let bodyData = {
        "eventName": this.form.value.eventName,    //edit
        "description": this.form.value.description,
        "eventDate": this.form.value.eventDate,
        "location": this.form.value.location,
        "startTime": this.form.value.startTime,
        "endTime": this.form.value.startTime,
        "guestCount": this.form.value.guestCount
      };
  
      this.http.patch("https://localhost:7128/api/Event/UpdateEvent/" + this.currentEventID, bodyData)
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert("Event Updated Successfully");
          this.getAllEvent();
          this.form.reset();
          this.isUpdateFormActive = false;
        }, (error) => {
          console.error("Error updating event:", error);
          alert("Failed to update event. Please try again.");
        });
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

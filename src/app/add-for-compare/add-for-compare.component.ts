import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-add-for-compare',
  templateUrl: './add-for-compare.component.html',
  styleUrls: ['./add-for-compare.component.scss']
})
export class AddForCompareComponent {





  selectedValue?: string;


  onSelectedValue (event:Event){
    this.selectedValue = (event.target as HTMLSelectElement).value;
    console.log('selectedValue', this.selectedValue);
  }






}

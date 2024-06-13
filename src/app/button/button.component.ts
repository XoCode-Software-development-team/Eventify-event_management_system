import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddForCompareComponent } from '../add-for-compare/add-for-compare.component';



@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor(private dialogRef : MatDialog){}


    openDialog(){
      this.dialogRef.open(AddForCompareComponent)
    }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.scss']
})
export class NavIconComponent implements OnInit {
  @Input() iconList: any; // Input property to receive the list of icons
  @Output() buttonClick = new EventEmitter<void>(); // Output event emitter for button clicks

  ngOnInit(): void {
  }

  // Method to emit button click event when an icon is clicked
  callParent(item:any){
    // Check if the clicked icon is for notifications
    if (item.Url == 'notification'){
      // Emit the buttonClick event
      this.buttonClick.emit();
    }
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.scss'],
})
export class NavIconComponent implements OnInit, OnChanges {
  activeIcon: string | null = null;

  @Input() iconList: any; // Input property to receive the list of icons
  @Input() popupToggle!: string; // Input property to receive the real-time state of the popupToggle button
  @Output() buttonClick = new EventEmitter<string>(); // Output event emitter for button clicks

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.activeIcon = this.popupToggle ? this.popupToggle : null;
  }

  // Method to emit button click event when an icon is clicked
  callParent(item: any) {
    // Emit the buttonClick event
    this.buttonClick.emit(item.Tag);
  }
}

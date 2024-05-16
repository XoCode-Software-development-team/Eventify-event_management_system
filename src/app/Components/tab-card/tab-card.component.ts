import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss'],
})
export class TabCardComponent implements OnInit, OnChanges {
  activeTab: string | null = null;

  @Input() card: Category[] = [];
  @Output() childEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.card != null && this.card.length != 0) {
      // Initialize the active tab with the first category ID
      this.viewServiceAndResource(this.card[0].id);
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.viewServiceAndResource(this.card[0].id);
  }

  // Function to emit the selected category ID
  viewServiceAndResource(category: string) {
    this.activeTab = category; // Set the active tab
    this.childEvent.emit(category); // Emit the selected category ID
  }
}

import { style } from '@angular/animations';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss'],
})
export class TabCardComponent implements OnInit {

  activeButton: string | null = null;

  @Input() card:any;
  @Output() childEvent:EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    if(this.card != null)
      this.viewService(this.card[0]);
  }

  viewService(category:string){
    this.activeButton = category;
    this.childEvent.emit(category);
  }
}

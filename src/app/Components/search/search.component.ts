import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() mapStart = new EventEmitter<{ started: boolean, data?: string }>();
  searchQuery: string = '';

  searchChange() {
    if(this.searchQuery.length > 0) {
      this.mapStart.emit({ started: true, data: this.searchQuery });
    } else {
      this.mapStart.emit({ started: false, data: this.searchQuery });
    }
  }

}

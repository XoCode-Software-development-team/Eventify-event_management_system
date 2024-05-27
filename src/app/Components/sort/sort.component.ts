import { Component, EventEmitter, Output } from '@angular/core';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {  
  @Output() sortChange = new EventEmitter<string>();
  selectedSort: string;

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString());

  sortBy = [
    {value: 'sNameAZ', viewValue: `${this.capitalizedTag} name A to Z`},
    {value: 'sNameZA', viewValue: `${this.capitalizedTag} name Z to A`},
    {value: 'RateLH', viewValue: 'Rating low to high'},
    {value: 'RateHL', viewValue: 'Rating high to low'},
  ];

  constructor(private _serviceAndResource: ServiceAndResourceService) {
    this.selectedSort = this.sortBy[0].value;
  }

  sortService(value: string) {
    this.selectedSort = value;
    this.sortChange.emit(this.selectedSort);
  }

  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

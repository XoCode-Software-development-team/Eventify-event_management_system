import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataUpdateService } from 'src/app/Services/data-update/data-update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss'],
})
export class TabCardComponent implements OnInit, OnDestroy {
  
  private dataDeletedSubscription: Subscription = new Subscription();

  constructor(private _dataUpdateService: DataUpdateService) {}

  activeTab: string | null = null;

  @Input() card: any;
  @Output() childEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.card != null && this.card.length > 0) {
      this.dataDeletedSubscription =
        this._dataUpdateService.dataDeleted.subscribe(() => {
          this.ngOnInit();
        });

      this.viewService(this.card[0]);
    }
  }

  ngOnDestroy(): void {
    this.dataDeletedSubscription.unsubscribe();
  }

  viewService(category: string) {
    this.activeTab = category;
    this.childEvent.emit(category);
  }
}

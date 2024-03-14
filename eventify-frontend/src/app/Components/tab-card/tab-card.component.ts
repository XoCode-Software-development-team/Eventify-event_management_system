import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss'],
})
export class TabCardComponent implements OnInit {
  
  activeTab: string | null = null;

  @Input() card: Category[] = [];
  @Output() childEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.viewService(this.card[0].id);
  }

  viewService(category: string) {
    this.activeTab = category;
    this.childEvent.emit(category);
  }
}

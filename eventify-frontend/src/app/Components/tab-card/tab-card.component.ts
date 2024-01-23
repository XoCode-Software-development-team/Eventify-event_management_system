import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.scss'],
})
export class TabCardComponent {
  categories = ['Entertainment', 'Catering', 'Decoration'];
}

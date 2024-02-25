import { Component } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  button1 = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    display: 'inline'
  };
  button2 = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'subscriptions',
    display: 'inline'
  };
}

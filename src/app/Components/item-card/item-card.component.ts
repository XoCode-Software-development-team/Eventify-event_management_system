import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent  {

  // Input property to receive service data from parent component
  @Input() service: any = [];

  // Button configuration for Compare action
  compareButton = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    display: 'inline'
  };

  // Button configuration for Follow action
  followButton = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'subscriptions',
    display: 'inline'
  };

}

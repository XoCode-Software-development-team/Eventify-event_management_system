import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  // Input property to receive service/resource data from parent component
  @Input() dataSource: any = [];

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  // Button configuration for Compare action
  compareButton = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    display: 'inline',
  };

  // Button configuration for Follow action
  followButton = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'subscriptions',
    display: 'inline',
  };

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}

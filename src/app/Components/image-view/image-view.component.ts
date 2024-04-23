import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent {
  @Input() images: any;
  temp: any = null;

  swapImage(i: any): void {
    // Swap the main image with the thumbnail image at index i
    this.temp = this.images[0];
    this.images[0] = this.images[i];
    this.images[i] = this.temp;
  }
}

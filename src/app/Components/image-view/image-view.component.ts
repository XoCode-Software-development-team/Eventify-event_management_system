import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  @Input() images:any;
  temp :any = null;

  ngOnInit(): void {
      
  }
  swapImage(i: any) {
    this.temp = this.images[0];
    this.images[0] = this.images[i];
    this.images[i] = this.temp;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() maxPrice:number | undefined;
  max = 0;

  ngOnInit(): void {
    if (this.maxPrice != null) {
      this.max = this.maxPrice;
    }
  }

  calculateStep(maxPrice:any) {
    return Math.ceil(maxPrice / 100);
  }

}

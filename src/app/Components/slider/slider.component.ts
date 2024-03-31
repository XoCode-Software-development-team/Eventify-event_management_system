import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() maxPrice:number | undefined;

  calculateStep(maxPrice:any) {
    return Math.ceil(maxPrice / 100);
}

}

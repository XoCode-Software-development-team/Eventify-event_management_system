import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.scss']
})
export class NavIconComponent implements OnInit {
  @Input() iconList: any;

  ngOnInit(): void {
 
  }
}

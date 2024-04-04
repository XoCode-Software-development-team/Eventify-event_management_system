import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.scss']
})
export class NavIconComponent implements OnInit {
  @Input() iconList: any;
  @Output() buttonClick = new EventEmitter<void>

  ngOnInit(): void {
 
  }

  callParent(item:any){
    if (item.Url == 'notification'){
      this.buttonClick.emit();
    }
  }
}

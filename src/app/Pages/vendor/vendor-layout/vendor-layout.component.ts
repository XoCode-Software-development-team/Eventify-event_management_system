import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'src/app/Interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.scss']
})
export class VendorLayoutComponent {


  navList = [
    {
      text: "Home",
      url: "homePage"
    },
    {
      text: "Service",
      url: "service"
    },
    {
      text: "Resource",
      url: "resource"
    }
  ]

}



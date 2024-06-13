import { Component, OnInit } from '@angular/core';
import { VendorService, Vendor } from '../Services/vendor.service';

@Component({
  selector: 'app-show-comparison',
  templateUrl: './show-comparison.component.html',
  styleUrls: ['./show-comparison.component.scss']
})
export class ShowComparisonComponent implements OnInit {

  vendors: Vendor[] = [];




  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {

    this.vendorService.getVendors().subscribe(data => {
      this.vendors = data;
    });


  }

}

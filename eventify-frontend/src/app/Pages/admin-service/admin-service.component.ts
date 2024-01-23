import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface PeriodicElement {
  VendorId: string;
  Service: string;
  Rating: number;
  Avaliability: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"},
  {VendorId:"V01",Service:"Swan boat ride",Rating:3,Avaliability:"Booked"}
];


@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss']
})


export class AdminServiceComponent {
  displayedColumns: string[] = ['VendorId', 'Service', 'Rating', 'Avaliability'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}

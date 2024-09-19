import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { Button, CompareList } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';
import { CompareService } from 'src/app/Services/compare.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-box',
  templateUrl: './compare-box.component.html',
  styleUrls: ['./compare-box.component.scss'],
})
export class CompareBoxComponent implements OnInit {

  compareButton: Button = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    class: ['fullWidth'],
    iconClass: [],
    disable: false,
  };

  serviceCompareList$: Observable<CompareList[]>;
  resourceCompareList$: Observable<CompareList[]>;

  serviceCompareList: CompareList[] = [];
  resourceCompareList: CompareList[] = [];

  constructor(
    private _toast: ToastService,
    private _serviceAndResources: ServiceAndResourceService,
    private _compare: CompareService,
    private dialogRef: MatDialogRef<CompareBoxComponent>,// Inject MatDialogRef
    private _router : Router
  ) {
    this.serviceCompareList$ = this._compare.serviceCompareList$;
    this.resourceCompareList$ = this._compare.resourceCompareList$;
  }

  ngOnInit() {
    this.serviceCompareList$.subscribe(
      (list) => (this.serviceCompareList = list)
    );
    this.resourceCompareList$.subscribe(
      (list) => (this.resourceCompareList = list)
    );
  }

  compare() {
    const compareList = this.getCurrentCompareList();


    if (compareList.length >= 3) {

      if (this._serviceAndResources.checkUrlString() === 'service') {
        const list = this.serviceCompareList
        this.navigateToCompareView(list);

      } else {
        const list = this.resourceCompareList
        this.navigateToCompareView(list);

      }
      this.closePopUP();


    } else {

      const length = compareList.length;
      this._toast.showMessage(`Add ${3 - length} ${length == 0 ? '' : 'more'} ${this.isServiceOrResource()}${length < 1 ? 's' : ''} to compare list`,'info');
      this._router.navigate([`/${this.isServiceOrResource()}s`]);
    }
  }

  remove(index: number) {
    if (this.isServiceOrResource() === 'service') {
      this._compare.removeServiceFromCompare(index);
    } else {
      this._compare.removeResourceFromCompare(index);
    }
  }

  isServiceOrResource(): string {
    return this._serviceAndResources.checkUrlString();
  }

  getCurrentCompareList(): CompareList[] {
    return this.isServiceOrResource() === 'service'
      ? this.serviceCompareList
      : this.resourceCompareList;
  }

  navigate() {
    this._router.navigate([`/${this.isServiceOrResource()}s`])
    this.dialogRef?.close();
  }
  
  closePopUP() {
    this.dialogRef?.close();
    if(this.getCurrentCompareList().length < 3) {
      this._toast.showMessage(`Compare ${this.isServiceOrResource()}s by adding to compare box`,'info');
    }
  }

  navigateToCompareView(list:CompareList[]) {
    const queryParams = JSON.stringify(list.map(item => ({ soRid: item.soRId, name: item.name })));
    // console.log(queryParams)
    this._router.navigate([`${this.isServiceOrResource()}s/compare`],{ queryParams: { data: queryParams }});
  }
}

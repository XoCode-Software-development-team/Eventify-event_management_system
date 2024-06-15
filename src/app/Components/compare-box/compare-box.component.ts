import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { Button, CompareList } from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';
import { CompareService } from 'src/app/Services/compare.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

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
    private compareService: CompareService,
    private dialogRef: MatDialogRef<CompareBoxComponent>// Inject MatDialogRef
  ) {
    this.serviceCompareList$ = this.compareService.serviceCompareList$;
    this.resourceCompareList$ = this.compareService.resourceCompareList$;
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
      // Proceed with comparison logic
      if (this._serviceAndResources.checkUrlString() === 'service') {
        console.log(this.serviceCompareList)
      } else {
        console.log(this.resourceCompareList)
      }
    } else {
      const length = compareList.length;
      this._toast.showMessage(
        `Add ${3 - length} ${
          length == 0 ? '' : 'more'
        } ${this.isServiceOrResource()}${
          length < 1 ? 's' : ''
        } to compare list`,
        'info'
      );
    }
  }

  remove(index: number) {
    if (this.isServiceOrResource() === 'service') {
      this.compareService.removeServiceFromCompare(index);
    } else {
      this.compareService.removeResourceFromCompare(index);
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
  
  closePopUP() {
    this.dialogRef?.close();
    this._toast.showMessage(`Compare ${this.isServiceOrResource()}s by adding to compare box`,'info');
  }
}

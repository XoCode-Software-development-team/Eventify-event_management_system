import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { CompareList } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private serviceCompareList: CompareList[] = [];
  private resourceCompareList: CompareList[] = [];
  
  private serviceCompareListSubject = new BehaviorSubject<CompareList[]>([]);
  private resourceCompareListSubject = new BehaviorSubject<CompareList[]>([]);
  private compareBadgeSubject = new BehaviorSubject<any>({ serviceCount: 0, resourceCount: 0 });
  
  serviceCompareList$ = this.serviceCompareListSubject.asObservable();
  resourceCompareList$ = this.resourceCompareListSubject.asObservable();
  compareBadge$ = this.compareBadgeSubject.asObservable();

  constructor(private _toast:ToastService) {}

  addServiceToCompare(item: CompareList) {
    if (this.serviceCompareList.length < 3 && this.isSameCategory(this.serviceCompareList, item.categoryId)) {
      this.serviceCompareList.push(item);
      this.serviceCompareListSubject.next(this.serviceCompareList);
    } else {
      this._toast.showMessage("Only services of the same category can be compared.", 'info');
    }
    this.updateCompareBadge();
  }

  addResourceToCompare(item: CompareList) {
    if (this.resourceCompareList.length < 3 && this.isSameCategory(this.resourceCompareList, item.categoryId)) {
      this.resourceCompareList.push(item);
      this.resourceCompareListSubject.next(this.resourceCompareList);
    } else {
      this._toast.showMessage("Only resources of the same category can be compared.", 'info');
    }
    this.updateCompareBadge();
  }

  removeServiceFromCompare(index: number) {
    this.serviceCompareList.splice(index, 1);
    this.serviceCompareListSubject.next(this.serviceCompareList);
    this.updateCompareBadge();
  }

  removeResourceFromCompare(index: number) {
    this.resourceCompareList.splice(index, 1);
    this.resourceCompareListSubject.next(this.resourceCompareList);
    this.updateCompareBadge();
  }

  private isSameCategory(list: CompareList[], categoryId: number): boolean {
    return list.length === 0 || list[0].categoryId === categoryId;
  }

  private updateCompareBadge() {
    const serviceLength = this.serviceCompareList.length
    const resourceLength = this.resourceCompareList.length
    this.compareBadgeSubject.next({serviceCount:serviceLength,resourceCount:resourceLength});
  }

IsInList(soRId: number): boolean {
  return this.serviceCompareList.some(x => x.soRId === soRId) || this.resourceCompareList.some(x => x.soRId === soRId);
}

}

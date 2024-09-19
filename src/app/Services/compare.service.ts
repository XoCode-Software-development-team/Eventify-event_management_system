import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { CompareList } from '../Interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private Url: string = baseApiUrl.Url;
  private apiUrl = this.Url + '/api/compare';
  private serviceCompareList: CompareList[] = [];
  private resourceCompareList: CompareList[] = [];

  private serviceCompareListSubject = new BehaviorSubject<CompareList[]>([]);
  private resourceCompareListSubject = new BehaviorSubject<CompareList[]>([]);
  private compareBadgeSubject = new BehaviorSubject<any>({
    serviceCount: 0,
    resourceCount: 0,
  });

  serviceCompareList$ = this.serviceCompareListSubject.asObservable();
  resourceCompareList$ = this.resourceCompareListSubject.asObservable();
  compareBadge$ = this.compareBadgeSubject.asObservable();

  constructor(private _toast: ToastService, private _http: HttpClient) {}

  addServiceToCompare(item: CompareList) {
    if (
      this.serviceCompareList.length < 3 &&
      this.isSameCategory(this.serviceCompareList, item.categoryId)
    ) {
      this.serviceCompareList.push(item);
      this.serviceCompareListSubject.next(this.serviceCompareList);
    } else {
      this._toast.showMessage(
        'Only services of the same category can be compared.',
        'info'
      );
    }
    this.updateCompareBadge();
  }

  addResourceToCompare(item: CompareList) {
    if (
      this.resourceCompareList.length < 3 &&
      this.isSameCategory(this.resourceCompareList, item.categoryId)
    ) {
      this.resourceCompareList.push(item);
      this.resourceCompareListSubject.next(this.resourceCompareList);
    } else {
      this._toast.showMessage(
        'Only resources of the same category can be compared.',
        'info'
      );
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
    const serviceLength = this.serviceCompareList.length;
    const resourceLength = this.resourceCompareList.length;
    this.compareBadgeSubject.next({
      serviceCount: serviceLength,
      resourceCount: resourceLength,
    });
  }

  IsInList(soRId: number): boolean {
    return (
      this.serviceCompareList.some((x) => x.soRId === soRId) ||
      this.resourceCompareList.some((x) => x.soRId === soRId)
    );
  }

  getCategoryName(soRId: number) {
    return this._http.get(`${this.apiUrl}/category/${soRId}`);
  }

  getOverviews(soRIds: string) {
    return this._http.get(`${this.apiUrl}/overview/${soRIds}`);
  }

  getFeatures(soRIds: string) {
    return this._http.get(`${this.apiUrl}/features/${soRIds}`);
  }

  getImages(soRIds: string) {
    return this._http.get(`${this.apiUrl}/images/${soRIds}`);
  }

  getVideos(soRIds: string) {
    return this._http.get(`${this.apiUrl}/videos/${soRIds}`);
  }

  getManuals(soRIds: string) {
    return this._http.get(`${this.apiUrl}/manuals/${soRIds}`);
  }

  getPrices(soRIds: string) {
    return this._http.get(`${this.apiUrl}/prices/${soRIds}`);
  }

  getLocations(soRIds: string) {
    return this._http.get(`${this.apiUrl}/locations/${soRIds}`);
  }

  getRatings(soRIds: string) {
    return this._http.get(`${this.apiUrl}/ratings/${soRIds}`);
  }
}

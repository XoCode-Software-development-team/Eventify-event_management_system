import { ToastService } from './../../Services/toast.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Button, CompareList } from 'src/app/Interfaces/interfaces';
import { VendorFollowService } from 'src/app/Services/vendor-follow.service';
import { Observable, catchError, map, of, tap, filter } from 'rxjs';
import { CompareService } from 'src/app/Services/compare.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit, OnChanges {
  // Input property to receive service/resource data from parent component
  @Input() dataSource: any = [];
  clickEdItem!:string;
  isLoading!:boolean;
  btnLoading!:boolean;

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _auth: AuthenticationService,
    private _vendorFollow: VendorFollowService,
    private _toast: ToastService,
    private _compare: CompareService
  ) {}

  // Button configuration for Compare action
  compareButton : Button = {
    url: '',
    type: 'button',
    text: 'Compare',
    icon: 'compare',
    class: [],
    iconClass: [],
    disable: false,
  };

  // Button configuration for Follow action
  followButton: Button = {
    url: '',
    type: 'button',
    text: 'Follow',
    icon: 'person_add',
    class: ['follow'],
    iconClass: [],
    disable: false,
  };

  followedButton: Button = {
    url: '',
    type: 'button',
    text: 'Following',
    icon: 'person',
    class: ['following'],
    iconClass: [],
    disable: false,
  };

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._auth.isLoggedIn()) {
      this.btnLoading = true; // Set loading state to true initially
      let completedCount = 0; // Track the number of completed async operations
  
      this.dataSource.forEach((item: any) => {
        this.checkFollow(item.soRId).subscribe((isFollowing: boolean) => {
          item.isFollow = isFollowing;
          completedCount++;
  
          // Check if all operations are completed
          if (completedCount === this.dataSource.length) {
            this.btnLoading = false; // Set loading state to false when all operations are done
          }
        });
      });
    }
    console.log(this.dataSource)
  }
  

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }

  checkFollow(soRId: number): Observable<boolean> {
    return this._vendorFollow.isFollow(soRId).pipe(
      map((res: any) => res.isFollow),
      catchError((err: any) => {
        // console.error(err);
        return of(false);
      })
    );
  }

  toggleFollow(item: any): void {
    if (this._auth.isLoggedIn()) {
      this.isLoading = true;
      this.clickEdItem = item.vendor;
      this._vendorFollow.toggleFollow(item.soRId).subscribe({
        next: (res: any) => {
          // console.log(res)
          this._toast.showMessage(res.message, 'success');
          // Update isFollow state after successful toggle if necessary
          this.dataSource.forEach((element:any) => {
            if (element.vendor == item.vendor) {
              element.isFollow = !element.isFollow;
            }
          });
          this.isLoading = false;
        },
        error: (err: any) => {
          // console.log(err);
          this._toast.showMessage(err.message, 'error');
          this.isLoading = false;
        }
      });
    } else {
      this._toast.showMessage("Please login to follow!", 'info');
      this.isLoading = false;
    }
  }

  updateButton(isFollow:boolean):Button {
    if(this._auth.isLoggedIn()) {
      if(isFollow) {
        return this.followedButton
      } else {
        return this.followButton;
      }
    } else {
      return this.followButton;
    }
  }

  addToCompare(item:any) {
    let list: CompareList = {
      soRId:item.soRId,
      name:item.name,
      categoryId:item.categoryId
    }

    let isInList = this._compare.IsInList(list.soRId);
    if (isInList) {
      this._toast.showMessage(`This ${this.checkUrlString()} already in compare box`,'info');
      return;
    }

    if (this.checkUrlString() === 'service') {
      this.addServiceToCompare(list);
    } else {
      this.addResourceToCompare(list);
    }
  }

  addServiceToCompare(item: CompareList) {
    this._compare.addServiceToCompare(item);
  }

  addResourceToCompare(item: CompareList) {
    this._compare.addResourceToCompare(item);
  }
}

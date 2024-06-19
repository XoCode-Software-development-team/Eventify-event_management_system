import { Location } from './../../../Interfaces/interfaces';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Button, PriceModel } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CompareService } from 'src/app/Services/compare.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VendorFollowService } from 'src/app/Services/vendor-follow.service';

interface CompareItem {
  soRid: number;
  name: string;
  overview: {
    companyName: string;
    avatarUrl: string;
  };
  features: string[];
  images: string[];
  videos: string[];
  manuals: string[];
  prices: Price[];
  locations: Location[];
  overallRate: number;
}

interface Price {
  value: number;
  modelName: string;
  name: string;
}

@Component({
  selector: 'app-compare-view',
  templateUrl: './compare-view.component.html',
  styleUrls: ['./compare-view.component.scss'],
})
export class CompareViewComponent implements OnInit, OnDestroy {
  followButton: Button = {
    url: '',
    type: '',
    text: 'Follow',
    icon: 'person_add',
    class: ['follow'],
    iconClass: [],
    disable: false,
  };

  followedButton: Button = {
    url: '',
    type: '',
    text: 'Following',
    icon: 'person',
    class: ['following'],
    iconClass: [],
    disable: false,
  };

  dataSource: CompareItem[] = [];
  soRIds!: string;
  data: { soRid: number; name: string }[] = [];
  navbar: { tag: string; icon: string; fragment: string }[] = [];
  categoryName!: string;
  fragment: string = 'overview';
  routerSubscription!: Subscription;
  btnLoading: { [key: number]: boolean } = {};
  followState: { [key: number]: Button } = {};
  currentSlide = [0, 0, 0]; // Array to track current slide index for each carousel
  maxVideoLength: number = 0;
  maxPriceLength: number = 0;
  overviewLoading: boolean = false;
  featuresLoading: boolean = false;
  imagesLoading: boolean = false;
  videosLoading: boolean = false;
  manualsLoading: boolean = false;
  priceLoading: boolean = false;
  locationLoading: boolean = false;
  ratingLoading: boolean = false;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _compare: CompareService,
    private _auth: AuthenticationService,
    private _vendorFollow: VendorFollowService,
    private _toast: ToastService,
    private _serviceResource: ServiceAndResourceService
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
    this.initializeDataSource();
    this.initializeNavBar();
    this.subscriptionOfRouter();
    this.getCategoryName(this.data[0].soRid);
    this.getOverviewData(this.soRIds);
    this.getFeatureData(this.soRIds);
    this.getImageData(this.soRIds);
    this.getVideoData(this.soRIds);
    if (!this.isService()) {
      this.getManualData(this.soRIds);
    }
    this.getPriceData(this.soRIds);
    this.getLocationData(this.soRIds);
    this.getRatingData(this.soRIds);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  initializeNavBar() {
    this.navbar = [
      { tag: 'Overview', icon: 'info', fragment: 'overview' },
      { tag: 'Features & facilities', icon: 'list', fragment: 'features' },
      { tag: 'Images', icon: 'photo', fragment: 'images' },
      { tag: 'Videos', icon: 'videocam', fragment: 'videos' },
      { tag: 'User manuals', icon: 'description', fragment: 'manuals' },
      { tag: 'Prices', icon: 'attach_money', fragment: 'prices' },
      { tag: 'Locations', icon: 'place', fragment: 'locations' },
      { tag: 'User ratings', icon: 'star', fragment: 'ratings' },
    ];

    if (this.isService()) {
      const index = this.navbar.findIndex(
        (item) => item.fragment === 'manuals'
      );
      if (index > -1) {
        this.navbar.splice(index, 1);
      }
    }
  }

  getQueryParams() {
    this._activateRoute.queryParams.subscribe((params) => {
      if (params['data']) {
        this.data = JSON.parse(params['data']);
        // console.log(this.data); // This will be your array of objects
      }
    });
  }

  subscriptionOfRouter() {
    this.routerSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this._router.parseUrl(this._router.url).fragment;
        this.fragment = fragment || 'overview';
      }
    });
  }

  initializeDataSource() {
    this.data.forEach((item) => {
      this.dataSource.push({
        soRid: item.soRid,
        name: item.name,
        overview: {
          companyName: '',
          avatarUrl: '',
        },
        features: [],
        images: [],
        videos: [],
        manuals: [],
        prices: [],
        locations: [],
        overallRate: 0,
      });
    });
    // console.log(this.dataSource)
    this.soRIds = this.data.map((item) => item.soRid).join(',');
    // console.log(this.soRIds);
  }

  getCategoryName(soRId: number) {
    this._compare.getCategoryName(soRId).subscribe({
      next: (res: any) => {
        this.categoryName = res.categoryName;
        // console.log(res);
      },
      error: (err: any) => {
        // console.error(err);
      },
    });
  }
  getOverviewData(soRIds: string) {
    this.overviewLoading = true;
    this._compare.getOverviews(soRIds).subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.overview = element.overview; // Correcting the property name
            this.checkFollow(existingItem.soRid); // Check follow state
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.overviewLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.overviewLoading = false;
      },
    });
  }

  getFeatureData(soRIds: string) {
    this.featuresLoading = true;
    this._compare.getFeatures(soRIds).subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.features = element.features; // Correcting the property name
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.featuresLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.featuresLoading = false;
      },
    });
  }

  getImageData(soRIds: string) {
    this.imagesLoading = true;
    this._compare.getImages(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.images = element.images; // Correcting the property name
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.imagesLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.imagesLoading = false;
      },
    });
  }

  getVideoData(soRIds: string) {
    this.videosLoading = true;
    this._compare.getVideos(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.videos = element.videos; // Correcting the property name
          }
        });
        this.maxVideoLength = this.calculateMaxVideosLength();
        // console.log(this.dataSource); // Logging the updated dataSource
        this.videosLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.videosLoading = false;
      },
    });
  }

  getManualData(soRIds: string) {
    this.manualsLoading = true;
    this._compare.getManuals(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.manuals = element.manuals; // Correcting the property name
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.manualsLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.manualsLoading = false;
      },
    });
  }

  getPriceData(soRIds: string) {
    this.priceLoading = true;
    this._compare.getPrices(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.prices = element.price; // Correcting the property name
          }
        });
        this.maxPriceLength = this.calculateMaxPricesLength();
        // console.log(this.dataSource); // Logging the updated dataSource
        this.priceLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.priceLoading = false;
      },
    });
  }

  getLocationData(soRIds: string) {
    this.locationLoading = true;
    this._compare.getLocations(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.locations = element.locations; // Correcting the property name
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.locationLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.locationLoading = false;
      },
    });
  }

  getRatingData(soRIds: string) {
    this.ratingLoading = true;
    this._compare.getRatings(soRIds).subscribe({
      next: (res: any) => {
        // console.log(res);
        res.forEach((element: any) => {
          const existingItem = this.dataSource.find(
            (dsItem) => dsItem.soRid === element.soRId
          );
          if (existingItem) {
            existingItem.overallRate = element.overallRate; // Correcting the property name
          }
        });
        // console.log(this.dataSource); // Logging the updated dataSource
        this.ratingLoading = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.ratingLoading = false;
      },
    });
  }

  checkFollow(soRId: number): void {
    if (!this._auth.isLoggedIn()) {
      return;
    }
    this.btnLoading[soRId] = true;
    this._vendorFollow.isFollow(soRId).subscribe({
      next: (res: any) => {
        this.followState[soRId] = res.isFollow
          ? this.followedButton
          : this.followButton;
        this.btnLoading[soRId] = false;
      },
      error: (err: any) => {
        // console.error(err);
        this.btnLoading[soRId] = false;
      },
    });
  }

  toggleFollow(soRId: number): void {
    if (this._auth.isLoggedIn()) {
      this.btnLoading[soRId] = true;
      this._vendorFollow.toggleFollow(soRId).subscribe({
        next: (res: any) => {
          // console.log(res)
          this._toast.showMessage(res.message, 'success');
          this.checkFollow(soRId);
        },
        error: (err: any) => {
          // console.log(err);
          this._toast.showMessage(err.message, 'error');
          this.btnLoading[soRId] = false;
        },
      });
    } else {
      this._toast.showMessage('Please login to follow!', 'info');
    }
  }

  calculateMaxVideosLength(): number {
    return Math.max(...this.dataSource.map((data) => data.videos.length));
  }

  calculateMaxPricesLength(): number {
    return Math.max(...this.dataSource.map((data) => data.prices.length));
  }

  isService(): boolean {
    let is = this._serviceResource.checkUrlString();
    if (is === 'service') {
      return true;
    } else {
      return false;
    }
  }

  getItemName(): string {
    return this._serviceResource.checkUrlString();
  }

  getFileName(url: string): string {
    // Regular expression to extract text between %2F and .
    const regex = /%2F([^?]*)\?/;
    // Match the regex pattern against the URL
    const match = url.match(regex);

    // Check if a match is found
    if (match && match.length >= 2) {
      // Extract the text between symbols and decode URI components
      const textBetweenSymbols = decodeURIComponent(
        match[1].replace(/\+/g, ' ')
      );
      return textBetweenSymbols;
    } else {
      // Log message if no match is found
      // console.log('No match found.');
      return '';
    }
  }
}

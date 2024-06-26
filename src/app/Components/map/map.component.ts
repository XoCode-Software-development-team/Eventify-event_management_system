import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/Services/map.service';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

interface ServiceResourceLocation {
  soRId: number;
  name: string;
  rating: number;
  vendorName: string;
  latitude: number;
  longitude: number;
  district: string;
  image: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @Input() query?: string;
  @Input() hight?: string;
  @ViewChild('googleMap', { static: false }) googleMap: any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  locations: ServiceResourceLocation[] = [];
  selectedLocation?: ServiceResourceLocation;
  center: google.maps.LatLngLiteral = { lat: 7.8731, lng: 80.7718 };
  markers: google.maps.Marker[] = [];
  zoom = 8; // Adjusted zoom level
  apiLoaded: boolean = false;
  mapLoading: boolean = false;
  soRId: number = 0;
  soRName: string = '';
  isServiceDetailsPage: boolean = false;

  constructor(
    private _map: MapService,
    private _serviceResource: ServiceAndResourceService,
    private _toast: ToastService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouterParams();
    this.initializeMap();
  }

  ngOnChanges(): void {
    if (!this.isServiceDetailsPage) {
      this.mapLoading = true;
      setTimeout(() => {
        if (this.apiLoaded) {
          this.getLocations(this.query);
        }
      }, 1000);
    }
  }

  getRouterParams() {
    this._route.params.subscribe((params) => {
      if (params) {
        this.isServiceDetailsPage = true;
        this.soRId = params['soRId'];
        this.soRName = params['name'];
        // console.log(this.soRId)
      }
    });
  }

  initializeMap() {
    this.mapLoading = true;
    this._map
      .loadGoogleMaps()
      .then(() => {
        this.apiLoaded = true;
        // console.log('Google Maps API loaded successfully');
        if (!this.isServiceDetailsPage) {
          this.getLocations();
        } else {
          this.getServiceResourceDetailsLocation();
        }
        this.mapLoading = false;
      })
      .catch((error) => {
        // console.error('Error loading Google Maps API', error);
      });
  }

  getLocations(query?: string) {
    if (query == null) {
      return;
    }
    this._map.getLocations(this.checkIsServiceOrResource(), query).subscribe({
      next: (res: any) => {
        if (res) {
          // console.log(res)
          setTimeout(() => {
            if (res.length == 0) {
              this._toast.showMessage(
                `No ${this.checkIsServiceOrResource()} location found in given district!`,
                'error'
              );
            }
          }, 2000);

          this.locations = [];
          res.forEach((item: any) => {
            if (item.locations && item.locations.length > 0) {
              item.locations.forEach((location: any) => {
                if (location.latitude && location.longitude) {
                  const itemLocation: ServiceResourceLocation = {
                    soRId: item.soRid,
                    name: item.name,
                    rating: item.overallRating,
                    vendorName: item.vendorName,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    district: location.district,
                    image: item.image,
                  };
                  this.locations.push(itemLocation);
                }
              });
            }
          });

          if (this.locations.length > 0) {
            // console.log(this.locations);
            this.adjustZoom();
          }
        }
      },
      error: (err: any) => {
        console.error('Error fetching locations:', err);
      },
    });
  }

  getServiceResourceDetailsLocation() {
    this.mapLoading = true;
    this.locations = [];
    this._map.getServiceResourceDetailsLocation(this.soRId).subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res) {
          if (res.locations && res.locations.length > 0) {
            res.locations.forEach((location: any) => {
              if (location.latitude && location.longitude) {
                const itemLocation: ServiceResourceLocation = {
                  soRId: res.soRid,
                  name: res.name, // Adjusted to match casing
                  rating: res.overallRating, // Adjusted to match casing
                  vendorName: res.vendorName, // Adjusted to match casing
                  latitude: location.latitude,
                  longitude: location.longitude,
                  district: location.district,
                  image: '', // Adjusted to match casing
                };
                this.locations.push(itemLocation); // Moved inside the if block
              }
            });
          }
        }
        // console.log(this.locations);
        this.adjustZoom();
      },
      error: (err: any) => {
        console.log(err);
        this.mapLoading = false;
      },
    });
  }

  adjustZoom(): void {
    if (
      !this.googleMap ||
      !this.googleMap._options ||
      this.locations.length === 0
    ) {
      console.log('Google Map or locations not available');
      this.mapLoading = false;
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.locations.forEach((location) => {
      bounds.extend(
        new google.maps.LatLng(location.latitude, location.longitude)
      );
    });

    // Fit map to marker bounds
    this.googleMap.fitBounds(bounds);

    // Update the zoom property based on the current zoom level of the map
    this.zoom = this.googleMap._zoom;
    this.mapLoading = false;
  }

  openInfoWindow(marker: MapMarker, location: ServiceResourceLocation) {
    this.selectedLocation = location;
    this.infoWindow.open(marker);
  }

  checkIsServiceOrResource(): string {
    return this._serviceResource.checkUrlString();
  }
}

import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
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
  @ViewChild('googleMap', { static: false }) googleMap: any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  locations: ServiceResourceLocation[] = [];
  selectedLocation?: ServiceResourceLocation;
  center: google.maps.LatLngLiteral = { lat: 7.8731, lng: 80.7718 };
  markers: google.maps.Marker[] = [];
  zoom = 8; // Adjusted zoom level
  apiLoaded: boolean = false;
  mapLoading: boolean = false;

  constructor(
    private _map: MapService,
    private _serviceResource: ServiceAndResourceService,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(): void {
    this.mapLoading = true;
    setTimeout(() => {
      if (this.apiLoaded) {
        this.getLocations(this.query);
      }
    }, 1000);
  }

  initializeMap() {
    this.mapLoading = true;
    this._map
      .loadGoogleMaps()
      .then(() => {
        this.apiLoaded = true;
        // console.log('Google Maps API loaded successfully');
        this.getLocations();
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

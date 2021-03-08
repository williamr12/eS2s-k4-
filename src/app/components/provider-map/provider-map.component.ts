
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

declare function initMap(): any;
declare function createMarker(place): any;
declare function initAutocomplete(): any;

@Component({
  selector: 'app-map',
  templateUrl: './provider-map.component.html',
  styleUrls: ['./provider-map.component.css']
})
export class ProviderMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    styles: [{
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{
        visibility: 'on'
      }]
    }]
  };
  markers = [];
  infoContent = '';

  // tslint:disable-next-line:typedef
  ngOnInit() {

    initMap();
    initAutocomplete();

    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: 44.956833,
        lng: -93.181056
      };
      this.markers.push({
        position: {
          lat: 44.953333,
          lng: -93.150056
        },
        label: {
          color: 'blue',
          text: 'Central Medical Clinic'
        },
        title: 'Marker Title',
        info: 'Marker info'
      });
      this.markers.push({
        position: {
          lat: 44.972733,
          lng: -93.261856
        },
        label: {
          color: 'blue',
          text: 'Hennepin County Medical Center'
        },
        title: 'Marker Title',
        info: 'Marker info'
      });
      this.markers.push({
        position: {
          lat: 44.977633,
          lng: -93.062056
        },
        label: {
          color: 'blue',
          text: 'Dr. Paul T. Chlebeck, MD'
        },
        title: 'Marker Title',
        info: 'Marker info'
      });
    });
  }
  // tslint:disable-next-line:typedef
  openInfo(marker: HTMLElement, info) {
    this.infoContent = info;
    // @ts-ignore
    this.info.open(marker);

  }
  // tslint:disable-next-line:typedef
  addMarker() {
    this.markers.push({
      position: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1)
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1)
    });
  }
}

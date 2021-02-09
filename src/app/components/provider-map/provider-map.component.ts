
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './provider-map.component.html',
  styleUrls: ['./provider-map.component.css']
})
export class ProviderMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  zoom = 18;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid'
  };
  markers = [];
  infoContent = '';

  // tslint:disable-next-line:typedef
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
      this.markers.push({
        position: {
          lat: x.coords.latitude,
          lng: x.coords.longitude
        },
        label: {
          color: 'blue',
          text: 'Marker Label'
        },
        title: 'Marker Title',
        info: 'Marker info',
        options: {
          animation: google.maps.Animation.BOUNCE
        }
      });
    });
  }
  // tslint:disable-next-line:typedef
  openInfo(marker: MapMarker, info) {
    this.infoContent = info;
    this.info.open(marker);

  }
  // tslint:disable-next-line:typedef
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1)
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    });
  }
}

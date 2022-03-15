import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiLoaded!: Observable<boolean>;
  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: 31.885724, lng: 73.301950 };
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    minZoom: 8,
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.addMarker()
  }

  markers: any = [];

  addMarker() {
    this.markers.push({
      position: {
        lat: 31.885724,
        lng: 73.301950
      },
      label: {
        color: 'darkgray',
        text: 'Poultry Farm' + (this.markers.length + 1)
      },
      title: 'Farm' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

}

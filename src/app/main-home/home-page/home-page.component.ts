import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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

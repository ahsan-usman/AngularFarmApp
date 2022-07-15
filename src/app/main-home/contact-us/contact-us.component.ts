import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  apiLoaded!: Observable<boolean>;
  markers: any = [];
  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: 34.19562, lng: 73.23577 };
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    minZoom: 8,
  }


  constructor() { }

  ngOnInit(): void {
    this.addMarker()
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: 34.19562,
        lng: 73.23577
      },
      label: {
        color: 'darkgray',
        text: 'IT PARK' + (this.markers.length + 1)
      },
      title: 'IT Park' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

}

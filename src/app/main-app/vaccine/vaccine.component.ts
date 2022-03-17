import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {
  Totalbirds: any = "";

  @ViewChild('birds') birdKey!: ElementRef;
  SelectBird() {
    localStorage.setItem("birds", this.birdKey.nativeElement.value)
  }
  constructor() { }

  ngOnInit(): void {
  }
  ngDoCheck() {
    this.Totalbirds = localStorage.getItem("birds")!;
  }

}

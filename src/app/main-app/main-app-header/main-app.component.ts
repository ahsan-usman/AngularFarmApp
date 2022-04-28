import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  showHeader = true;
  
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }
  hideHeader() {
    if (this.router.url === '/mainapp/login' || this.router.url === '/mainapp/signup') {
        this.showHeader = false;
    } else {
        this.showHeader = true;
    }
  } 

}

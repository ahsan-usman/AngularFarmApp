import { SalesDialogComponent } from './../sales-dialog/sales-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  
  openDialog() {
    this.dialog.open(SalesDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {

      }
    })
  }

}

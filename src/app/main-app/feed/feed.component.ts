import { MatDialog } from '@angular/material/dialog';
import { FeedDialogComponent } from './../feed-dialog/feed-dialog.component';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(FeedDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {

      }
    })
  }

}

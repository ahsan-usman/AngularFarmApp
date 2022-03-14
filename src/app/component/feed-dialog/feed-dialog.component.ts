import { MatDialog } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.css']
})
export class FeedDialogComponent implements OnInit {

  feedFormDialog! : FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.feedFormDialog = this.formBuilder.group({
      date :['', Validators.required],
      feed :[''] ,
      usedFeed : [''],
      note: ['']

    })

  }
  AddData(){

  }


}

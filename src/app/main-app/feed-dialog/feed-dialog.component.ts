import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.css']
})
export class FeedDialogComponent implements OnInit {

  feedFormData!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FeedDialogComponent>) { }

  ngOnInit(): void {
    this.feedFormData = this.formBuilder.group({
      date: ['', Validators.required],
      cost: [''],
      totalBags: [''],
      usedBags: [''],
      note: ['']
    })
    if (this.editData) {
      this.actionBtn = "Update";
      this.feedFormData.controls['date'].setValue(this.editData.date);
      this.feedFormData.controls['cost'].setValue(this.editData.cost);
      this.feedFormData.controls['totalBags'].setValue(this.editData.totalBags);
      this.feedFormData.controls['usedBags'].setValue(this.editData.usedBags);
      this.feedFormData.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) {
      if (this.feedFormData.valid) {
        this.apiService.postFeedData(this.feedFormData.value)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
              this.feedFormData.reset()
              this.dialogRef.close('save')
            },
            error: () => {
              this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
            }
          })
      }
    }
    else {
      this.updateData();
    }
  }

  updateData() {
    this.apiService.updateFeedData(this.feedFormData.value, this.editData._id)
      .subscribe({
        next: () => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.feedFormData.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

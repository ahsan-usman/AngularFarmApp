import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  actionBtn: string = "Save";
  farmForm!: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private api: ApiService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.farmForm = this.fromBuilder.group({
      date: ['', Validators.required],
      age: ['', Validators.required],
      mortality: ['', Validators.required],
      feed: ['', Validators.required],
      usedFeed: ['', Validators.required],
      diesel: ['', Validators.required],
      weight: [''],
      note: ['']
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.farmForm.controls['date'].setValue(this.editData.date);
      this.farmForm.controls['age'].setValue(this.editData.age);
      this.farmForm.controls['mortality'].setValue(this.editData.mortality);
      this.farmForm.controls['feed'].setValue(this.editData.feed);
      this.farmForm.controls['usedFeed'].setValue(this.editData.usedFeed);
      this.farmForm.controls['diesel'].setValue(this.editData.diesel);
      this.farmForm.controls['weight'].setValue(this.editData.weight);
      this.farmForm.controls['note'].setValue(this.editData.note);
    }
  }
  
  AddData() {
    if (!this.editData) {
      if (this.farmForm.valid) {
        this.api.postData(this.farmForm.value)
          .subscribe({
            next: (res) => {
              console.log(this.farmForm.value)
              this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
              this.farmForm.reset();
              this.dialogRef.close('save');
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
    this.api.putData(this.farmForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.farmForm.reset();
          this.dialogRef.close('update')
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

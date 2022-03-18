import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.css']
})
export class FeedDialogComponent implements OnInit {

  feedFormData! : FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FeedDialogComponent>) { }

  ngOnInit(): void {
    this.feedFormData = this.formBuilder.group({
      date :['', Validators.required],
      cost :[''] ,
      totalBags : [''],
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
  AddData(){
    if(!this.editData){
      if(this.feedFormData.valid){
        this.apiService.postFeedData(this.feedFormData.value)
        .subscribe({
          next:(res)=>{
            alert("Data Added Successfully")
            this.feedFormData.reset()
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("Error occured while Adding Data")
          }
        })
      }
    }
    else{
      this.updateData();
    }
  }

  updateData(){
    this.apiService.updateFeedData(this.feedFormData.value,this.editData.id)
    .subscribe({
      next:()=>{
        alert("Data Added Successfully")
        this.feedFormData.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error occured while updating data")
      }
    })
  }


}

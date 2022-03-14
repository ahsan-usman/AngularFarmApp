import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  actionBtn: string ="Save";

  farmForm!: FormGroup;

  constructor(private fromBuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
     private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.farmForm = this.fromBuilder.group({
      date: ['', Validators.required],
      age: ['', Validators.required],
      mortality: ['', Validators.required],
      // cumMortality: [''],
      // cumMortalityPercent: ['', Validators.required],
      feed: ['', Validators.required],
      usedFeed: ['', Validators.required],
      // cumFeed: [''],
      diesel : ['', Validators.required],
      weight: [''],
      // cumDiesel : [''],
      note: ['']
    });

    if(this.editData){

      this.actionBtn  ="Update";
      this.farmForm.controls['date'].setValue(this.editData.date);
      this.farmForm.controls['age'].setValue(this.editData.age);
      this.farmForm.controls['mortality'].setValue(this.editData.mortality);
      // this.farmForm.controls['cumMortality'].setValue(this.editData.cumMortality);
      // this.farmForm.controls['cumMortalityPercent'].setValue(this.editData.cumMortalityPercent);
      this.farmForm.controls['feed'].setValue(this.editData.feed);
      this.farmForm.controls['usedFeed'].setValue(this.editData.usedFeed);
      // this.farmForm.controls['cumFeed'].setValue(this.editData.cumFeed);
      this.farmForm.controls['diesel'].setValue(this.editData.diesel);
      this.farmForm.controls['weight'].setValue(this.editData.weight);
      // this.farmForm.controls['cumDiesel'].setValue(this.editData.cumDiesel);
      this.farmForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData(){
    if(!this.editData){
      if(this.farmForm.valid){
        this.api.postData(this.farmForm.value)
        .subscribe({
          next: (res)=>{
            alert("Data Added Successfully");
            this.farmForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while Adding Data")
          }
        })

      }
    }else{
      this.updateData();
    }
  }
  updateData(){
    this.api.putData(this.farmForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Product Updated Successfully")
        this.farmForm.reset();
        this.dialogRef.close('update')
      },
      error: ()=>{
        alert("Error while Updating Product")
      }
    })
  }



  
  

}

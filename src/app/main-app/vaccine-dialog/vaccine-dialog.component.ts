import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vaccine-dialog',
  templateUrl: './vaccine-dialog.component.html',
  styleUrls: ['./vaccine-dialog.component.css']
})
export class VaccineDialogComponent implements OnInit {

  vaccineForm!: FormGroup;
  actionBtn: string = "Save";
 
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<VaccineDialogComponent>
  ) { }

  ngOnInit(): void {
    this.vaccineForm = this.formBuilder.group({
      date: ['', Validators.required],
      medicine: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      vaccinated: ['', Validators.required],
      note: ['']
    })
    if (this.editData) {
      this.actionBtn = "Update";
      this.vaccineForm.controls['date'].setValue(this.editData.date);
      this.vaccineForm.controls['medicine'].setValue(this.editData.medicine);
      this.vaccineForm.controls['price'].setValue(this.editData.price);
      this.vaccineForm.controls['quantity'].setValue(this.editData.quantity);
      this.vaccineForm.controls['vaccinated'].setValue(this.editData.vaccinated);
      this.vaccineForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) {
      if (this.vaccineForm.valid) {
        this.apiService.postVaccineData(this.vaccineForm.value)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
              this.vaccineForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
            }
          })
      }
    }
    else {
      this.UpdateData();
    }
  }

  UpdateData() {
    this.apiService.updateVaccineData(this.vaccineForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.vaccineForm.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
        }
      })
  }
}

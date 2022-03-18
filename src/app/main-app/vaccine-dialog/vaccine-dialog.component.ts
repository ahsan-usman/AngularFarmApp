import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
              alert("Data Added Successfully");
              this.vaccineForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while Adding Data")
            }
          })
      }
    }
    else {
      this.UpdateData();
    }
  }

  UpdateData() {
    this.apiService.updateVaccineData(this.vaccineForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Data Updated Successfully")
          this.vaccineForm.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          alert("Error while updating data")
        }
      })
  }
}

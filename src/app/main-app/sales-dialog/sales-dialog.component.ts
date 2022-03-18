import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.css']
})
export class SalesDialogComponent implements OnInit {

  saleForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<SalesDialogComponent>
  ) { }

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      date: ['', Validators.required],
      age: ['', Validators.required],
      truckNumber: ['', Validators.required],
      weight: ['', Validators.required],
      sold: ['', Validators.required],
      note: ['']
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.saleForm.controls['date'].setValue(this.editData.date);
      this.saleForm.controls['age'].setValue(this.editData.age);
      this.saleForm.controls['truckNumber'].setValue(this.editData.truckNumber);
      this.saleForm.controls['weight'].setValue(this.editData.weight);
      this.saleForm.controls['sold'].setValue(this.editData.sold);
      this.saleForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) { 
      if (this.saleForm.valid) {
        this.apiService.postSalesData(this.saleForm.value)
          .subscribe({
            next: (res) => {
              alert("Data Added Successfully");
              this.saleForm.reset();
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
    this.apiService.updateSalesData(this.saleForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Data Updated Successfully")
          this.saleForm.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          alert("Error while updating data")
        }
      })
  }

}

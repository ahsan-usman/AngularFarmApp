import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

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
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<SalesDialogComponent>
  ) { }

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      date: ['', Validators.required],
      truckNumber: ['', Validators.required],
      driver: ['', Validators.required],
      emptyWeight: ['', Validators.required],
      loadedWeight: ['', Validators.required],
      rate: ['', Validators.required],
      birds: ['', Validators.required],
      gatePass: ['', Validators.required],
      note: ['']
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.saleForm.controls['date'].setValue(this.editData.date);
      this.saleForm.controls['truckNumber'].setValue(this.editData.truckNumber);
      this.saleForm.controls['driver'].setValue(this.editData.driver);
      this.saleForm.controls['emptyWeight'].setValue(this.editData.emptyWeight);
      this.saleForm.controls['loadedWeight'].setValue(this.editData.loadedWeight);
      this.saleForm.controls['rate'].setValue(this.editData.rate);
      this.saleForm.controls['birds'].setValue(this.editData.birds);
      this.saleForm.controls['gatePass'].setValue(this.editData.gatePass);
      this.saleForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) {
      if (this.saleForm.valid) {
        this.apiService.postSalesData(this.saleForm.value)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
              this.saleForm.reset();
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
    this.apiService.putSalesData(this.saleForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.saleForm.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

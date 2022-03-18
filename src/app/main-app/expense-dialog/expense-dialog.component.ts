import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  saleForm!: FormGroup;
  actionBtn: string = "Save";
  constructor(private formbuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  ngOnInit(): void {
    this.saleForm = this.formbuilder.group({
      date: [''],
      utility: [''],
      salary: [''],
      maintenance: [''],
      note: ['']
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.saleForm.controls['date'].setValue(this.editData.date);
      this.saleForm.controls['utility'].setValue(this.editData.utility);
      this.saleForm.controls['salary'].setValue(this.editData.salary);
      this.saleForm.controls['maintenance'].setValue(this.editData.maintenance);
      this.saleForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) {
      if (this.saleForm.valid) {
        this.apiService.postExpenseData(this.saleForm.value)
          .subscribe({
            next: (res) => {
              alert("Data added successfully")
              this.saleForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while Adding Data")
            }
          })
      }
    }
    else{
      this.updateData();
    }
  }


  updateData(){
    this.apiService.updateExpenseData(this.saleForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
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

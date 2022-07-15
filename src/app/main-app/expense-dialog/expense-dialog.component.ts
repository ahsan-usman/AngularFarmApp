import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  ExpenseForm!: FormGroup;
  actionBtn: string = "Save";
  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>) {
  }

  ngOnInit(): void {
    this.ExpenseForm = this.formbuilder.group({
      date: ['', Validators.required],
      utility: ['', Validators.required],
      salary: ['', Validators.required],
      maintenance: ['', Validators.required],
      note: ['']
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.ExpenseForm.controls['date'].setValue(this.editData.date);
      this.ExpenseForm.controls['utility'].setValue(this.editData.utility);
      this.ExpenseForm.controls['salary'].setValue(this.editData.salary);
      this.ExpenseForm.controls['maintenance'].setValue(this.editData.maintenance);
      this.ExpenseForm.controls['note'].setValue(this.editData.note);
    }
  }

  AddData() {
    if (!this.editData) {
      if (this.ExpenseForm.valid) {
        this.apiService.postExpenseData(this.ExpenseForm.value)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
              this.ExpenseForm.reset();
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
    this.apiService.updateExpenseData(this.ExpenseForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.ExpenseForm.reset()
          this.dialogRef.close('update')
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

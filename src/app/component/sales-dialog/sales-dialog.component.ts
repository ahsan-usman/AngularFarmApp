import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.css']
})
export class SalesDialogComponent implements OnInit {

  saleForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.saleForm = this.formBuilder.group({
      date: ['', Validators.required],
      age: ['', Validators.required],
      weight: [''],
      sale: [''],
      truckNo: [''],
      beforeLoading: [''],
      afterLoading : [''],
      note: [''] 

    })
  }

  AddData(){
    
  }

}

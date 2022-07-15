import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-flock-data',
  templateUrl: './flock-data.component.html',
  styleUrls: ['./flock-data.component.css']
})
export class FlockDataComponent implements OnInit {

  flockData!: FormGroup;
  selectedValue!: string;
  flockRecord: any;
  uniqueId: any;
  showButton: boolean = false;
  addButton: boolean = true;
  selectoptions: any;
  value: any;

  constructor(private apiService: ApiService,
    private formbuilder: FormBuilder,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.apiService.getFlockData()
      .subscribe(res => {
        this.flockRecord = res;
        console.log("records" , this.flockRecord)
      })
    this.flockData = this.formbuilder.group({
      startDate: ['', Validators.required],
      flockName: ['', Validators.required],
      totalBirds: ['', Validators.required],
      farmName: ['', Validators.required]
    })
  }

  SelectDropDown(val: any) {
    this.apiService.getFarmData()
    .subscribe(res => {
      this.selectoptions = res;
      const farmId = this.selectoptions.find((x: any) => x.farmName == val);
      this.value = farmId?._id;
      localStorage.setItem('farmid', this.value)
    });
  }


  onSubmit() {
    console.log("values", this.flockData.value)
    this.apiService.postFlockData(this.flockData.value)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
        }
      })
  }

  deleteData(id: string) {
    this.apiService.deleteFlockData(id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data deleted Successfully", duration: 4000 })
          window.location.reload()
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }

  editData(data: any) {
    this.uniqueId = data._id;
    this.flockData.controls['startDate'].patchValue(data.startDate);
    this.flockData.controls['flockName'].patchValue(data.flockName);
    this.flockData.controls['totalBirds'].patchValue(data.totalBirds);
    this.flockData.controls['farmName'].patchValue(data.farmName);
    this.showButton = true;
    this.addButton = false;
  }

  updateData() {
    this.apiService.updateFlockData(this.flockData.value, this.uniqueId)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.flockData.reset()
          window.location.reload()
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

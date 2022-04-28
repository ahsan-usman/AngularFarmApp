import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-farms-data',
  templateUrl: './farms-data.component.html',
  styleUrls: ['./farms-data.component.css']
})
export class FarmsDataComponent implements OnInit {
  farmData!: FormGroup;
  farmDataRecord: any;
  uniqueId:any;
  showButton: boolean = false;
  addButton: boolean = true;
 
  
  constructor(private apiService: ApiService,
    private formbuilder: FormBuilder,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.apiService.getFarmData()
    .subscribe(res => {
      this.farmDataRecord = res;
    })
    this.farmData = this.formbuilder.group({
      farmName: ['', Validators.required],
      totalBirds: ['', Validators.required],
      location: ['',Validators.required]
    })
  }
  onSubmit() {
    this.apiService.postFarmData(this.farmData.value)
    .subscribe({
      next:(res)=>{
        this.toast.success({ detail: "Success Message", summary: "Data Added Successfully", duration: 4000 })
      },
      error:() =>{
        this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteFarmData(id)
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

  editData(data:any){
    this.uniqueId = data._id;
    this.farmData.controls['farmName'].patchValue(data.farmName);
    this.farmData.controls['totalBirds'].patchValue(data.totalBirds);
    this.farmData.controls['location'].patchValue(data.location);
    this.showButton = true;
    this.addButton = false;
  }

  updateData() {
    this.apiService.updateFarmData(this.farmData.value, this.uniqueId)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Updated Successfully", duration: 4000 })
          this.farmData.reset()
          window.location.reload()
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Updating Data", duration: 5000 })
        }
      })
  }
}

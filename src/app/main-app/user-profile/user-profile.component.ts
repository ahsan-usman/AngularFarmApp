import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateData!: FormGroup;
  viewUser: any;
  userName: string = "";
  userEmail: string = "";
  contact: number = 0;
  Userpassword: any;
  
  constructor(
    private formbuilder: FormBuilder,
    private updateApi: ApiService,
    private route: Router,
    private toast: NgToastService,) {
  }

  ngOnInit(): void {
    this.updateData = this.formbuilder.group({
      fullname: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
    })

    this.viewUser = JSON.parse(localStorage.getItem("userData")!);
    this.userName = this.viewUser.fullname;
    this.userEmail = this.viewUser.email;
    this.contact = this.viewUser.contact;
    this.Userpassword = this.viewUser.password;

    this.updateData.controls['fullname'].setValue(this.userName)
    this.updateData.controls['contact'].setValue(this.contact)
    this.updateData.controls['email'].setValue(this.userEmail)
    this.updateData.controls['password'].setValue(this.Userpassword)
  }

  update() {
    this.updateApi.updateSignUp(this.updateData.value, this.viewUser._id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "User Data Updated Successful", duration: 3000 })
          localStorage.clear();
          this.route.navigate(['/mainapp/login'])
        },
        error: () => { console.log("Error While Updating Data") }
      })
  }
}

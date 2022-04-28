import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup'
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  hide = true;
  submitted = false;
  response: any
  viewUser: any;
  userid: string = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    this.submitted = true;
    this.apiService.Getlogin(this.loginForm.value)
      .subscribe((res: any) => {
        this.response = res;
        localStorage.setItem('userData', JSON.stringify(this.response))
        this.viewUser = JSON.parse(localStorage.getItem("userData")!);
        this.userid = this.viewUser._id;
        localStorage.setItem("userid", this.userid)

        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', this.response.token)
          console.log("token save")
        }
        else {
          localStorage.removeItem('token')
          this.toast.warning({ detail: "Warning Message", summary: "User Not Found", duration: 5000 });
          localStorage.setItem('token', this.response.token)
        }
        this.router.navigate(['mainapp/dashboard'])
        this.toast.success({ detail: "Success Message", summary: "User Login Successful", duration: 3000})

      }, (err: any) => {
      
      })
  }

}


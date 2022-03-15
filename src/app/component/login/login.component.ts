import { GuardServiceService } from './../../services/guard-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private guardServiceService: GuardServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  bottomRight() {
    this.toast.success({ detail: "Success Message", summary: "User Login Successful", duration: 3000, position: 'br'})
  }


  onLogin() {
    let email = this.loginForm.value.email
    if (!email) {
      return
    }
    this.guardServiceService.loginCall(email)
      .subscribe((res: []) => {
        const user = res.find((a: any) => a.email === this.loginForm.value.email && a.password === this.loginForm.value.password);

        if (user) {
          localStorage.setItem("userData", JSON.stringify(user))
          this.bottomRight();
          this.loginForm.reset()
          this.router.navigate(['dashboard'])
        } else {
          this.toast.warning({ detail: "Warning Message", summary: "User Not Found", duration: 5000 });
        }
      }, err => {
        this.toast.info({ detail: "Info Message", summary: "Something went wrong", duration: 5000 })
      }
      )

  }

}

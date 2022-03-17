import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: NgToastService,
    private router: Router,
    // public translate: TranslateService
    ) {
    // translate.addLangs(['english', 'urdu']);
    // translate.setDefaultLang('english');

    // const browserLang = translate.getBrowserLang()!;
    // translate.use(browserLang.match(/english|urdu/) ? browserLang : 'english');
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      contact: [''],
      email: [''],
      password: [''],
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(res => {
        this.toast.success({ detail: "Success Message", summary: "User Registered Successful", duration: 3000 })
        this.signupForm.reset()
        this.router.navigate(['/mainapp/login'])
      }, err => {
        this.toast.info({ detail: "Info Message", summary: "Something went wrong", duration: 5000 })
      }
      )

  }


}

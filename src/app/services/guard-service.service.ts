import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {

  constructor(private http: HttpClient) { }

  public loginCall(email:string){
    
    return this.http.get<any>("http://localhost:3000/signupUsers?email="+email)
  }
  isAuthenticated(): boolean{
    let user = localStorage.getItem('userData')
    return user != null;
  }
}

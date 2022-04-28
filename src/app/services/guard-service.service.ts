import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService {

  jwtHelper = new JwtHelperService();

  constructor() { } 

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token')
    if (!token) {
      return false
    }
    try {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    catch (e) {
      return false
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token'); 
  }

  getId() {
    return localStorage.getItem('userid');
  }

  getFarmId() {
    return localStorage.getItem('farmid')
  }
  getFlockId() {
    return localStorage.getItem('flockid')
  }
}

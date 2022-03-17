import { GuardServiceService } from './services/guard-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {NgToastService} from 'ng-angular-popup'

@Injectable({
  providedIn: 'root'
})
export class ActivateGuardGuard implements CanActivate {
  constructor(private guardService: GuardServiceService, private router: Router, private toast:NgToastService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.guardService.isAuthenticated()){
        return true;
      }
      else{
        this.toast.error({detail:"Error Message", summary: "you don't have permission, Back to login", duration: 5000})
        this.router.navigate(['mainapp/login']);

      }
    return true;
  }
}

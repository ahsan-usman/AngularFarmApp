import { GuardServiceService } from './guard-service.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService = this.injector.get(GuardServiceService)
    if(!authService.getToken()){
      return next.handle(request);
    }

    let tokenData = request.clone({
      setHeaders:{
        "x-access-token":`${authService.getToken()}`,
        "user_id":`${authService.getId()}`,
        // "farms_id":`${authService.getFarmId()}`
        "flock_id":`${authService.getFlockId()}`
      }
    })
    return next.handle(tokenData);

  }
}

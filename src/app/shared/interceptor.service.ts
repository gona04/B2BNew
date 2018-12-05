import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { LoginService } from './login/login.service';

@Injectable()
export class InterceptorService implements HttpInterceptor{

  
  constructor(private _login: LoginService) { }

  intercept(req: HttpRequest<any>, next:HttpHandler) {
 
    const authToken = this._login.getToken();
    
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    })
    return next.handle(authRequest);
  }

}

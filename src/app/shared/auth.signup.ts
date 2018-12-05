import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";
@Injectable()
export class SignupAuth implements CanActivate {
    constructor(private _login: LoginService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this._login.getAuthStatus()
       
        if(isAuth) {
            const role = this._login.getRole();
            const goTo = role.toLowerCase();
            this.router.navigate([goTo]);
        }
        return !isAuth;
    }
}
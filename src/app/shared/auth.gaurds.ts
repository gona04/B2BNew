import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthGaurds implements CanActivate {
    constructor(private _login: LoginService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const role = localStorage.getItem('role');

        this._login.setRole(role);
        
        const isAuth = this._login.getAuthStatus()
        if(!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin.model';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private BASE_URL = environment.apiUrl + "admin/"

  constructor(private http: HttpClient, private _login: LoginService, private router: Router) { }

  login(admin: Admin) {
    this.http.post(this.BASE_URL + 'login', admin).subscribe((result:any) => {
      const token = result.token;
      const role = result.role;
      
      this._login.setToken(token);
      this._login.setRole(role);

      this._login.setAuthTimer(result.expiresIn);
      const now = new Date;
      const expDate = new Date(now.getTime() + result.expiresIn * 1000);
       //ADD VALUES TO LOCAL STORAGE
      this._login.saveAuthenticationDetails(this._login.getToken(), expDate , this._login.getRole(), result.id);
      
      const pageToGo = this._login.getRole().toLowerCase()
      this.router.navigate([pageToGo])
      
      alert('loggedin successfully')
    })
  }
}

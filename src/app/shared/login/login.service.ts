import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authStatus:boolean;
  private authStatusListener = new Subject<boolean>();
  private roleUpdate = new Subject<string>();
  private tokenTimer: any;
 private token: string;
 private role: string;
 private id: string;

  constructor(private router : Router ) { }

  setToken(value: string) {
    this.token = value
  }

  setRole(role: string) {
    this.role = role
    this.roleUpdate.next(role);
    
  }

  setAuthStatus(authStatus: boolean) {
    this.authStatus = authStatus
  }

  getToken() {
    return this.token;
  }
  getRole() {
    return this.role
  }

  getAuthStatus() {
    return this.authStatus
  }
  getAuthStatusListerner() {
    return this.authStatusListener.asObservable();
  }

  getUpdatedRole() {
    return this.roleUpdate.asObservable();
  }

getId() {
  return this.id;
}
  //METHODS BESIDES GETTERS AND SETTERS 
  logout() {
    
    this.token = null;
    this.clearAuthenticationDetails();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/'])
    
  }

   saveAuthenticationDetails(token: string, expiration: Date, role: string, id: string) {
    localStorage.setItem('ID', id);
    localStorage.setItem('token' , token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('role', role.toUpperCase());
    this.token = token;
    this.role = role;
    this.authStatus = true
    this.authStatusListener.next(true);
    this.roleUpdate.next(role);
   
    
  }

  private clearAuthenticationDetails() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("role");
    localStorage.removeItem('ID');
    this.authStatus = false
    this.authStatusListener.next(false);
    this.roleUpdate.next("");
  }

  autoAuthOwner() {
    
      const authInfo = this.getAuthData();

      if(!authInfo) {
        
        return;
      }
      const now = new Date();
      const expiration = authInfo.expirationDate.getTime() - now.getTime();
    
      if(expiration > 0) {
        this.token = authInfo.token;
        this.role = authInfo.role;
        //changes MADE ! 
        
        this.setRole(this.role);
        // this.roleUpdate.next(this.role)
        if(this.token) {
          this.authStatus = true
        this.authStatusListener.next(true);
        }
        
        this.setAuthTimer(expiration / 1000);
      }
    }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const role = localStorage.getItem("role");

    if(!token || !expirationDate || !role) {
      return;
    }
    //ADDED NEWLY 
    // this.roleUpdate.next(role);
    // 
    return {
      token : token,
      expirationDate: new Date(expirationDate) ,
      role: role
    }
  }

  setAuthTimer(duration: number){
   
    this.tokenTimer = setTimeout(() => {this.logout()}, duration * 1000);
  }  
}

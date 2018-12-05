import { Injectable } from '@angular/core';
import { Employee } from './employee.class';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private BASE_URL = environment.apiUrl +'employee/'
  constructor(private http: HttpClient, 
              private _login: LoginService,
              private router: Router) { }

  
  addEmployee(employee: Employee) {
    
    return this.http.post(this.BASE_URL + 'add', employee);
  }


  getAllEmployees() {
    return this.http.get(this.BASE_URL + 'getAllEmployees');
  }

  getAllDeletedEmployees() {
    
    return this.http.get(this.BASE_URL + 'getAllDeletedEmployees');
  }

  updateEmployee(emp: Employee) {
    return this.http.put(this.BASE_URL + 'updateEmployees', emp);
  }

  deleteForever(id: string) {
    return this.http.get(this.BASE_URL + 'deleteForever/' + id);
  }

  loginEmployee(employee: Employee) {
    this.http.post(this.BASE_URL + 'login', employee).subscribe((result: any) => {
      const token = result.token;
      const role = result.role;
      this._login.setToken(token);
      this._login.setRole(role);

      this._login.setAuthTimer(result.expiresIn);

      const now = new Date();
      const expDate = new Date( now.getTime() + result.expiresIn * 1000);

      this._login.saveAuthenticationDetails(this._login.getToken(), expDate , this._login.getRole(), result.id);

      // const pageToGo = this._login.getRole().toLowerCase()
      this.router.navigate(['/owner/list'])
      alert('loggedin successfully');
    })
  }

  getEmployeeById(id: string) {
    return this.http.get(this.BASE_URL + 'getEmployeeByOwnerId/' + id);
  }
}

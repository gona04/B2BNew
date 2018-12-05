import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/shared/owner/owner.model';
import { NgForm } from '@angular/forms';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { Router } from '@angular/router';
// import { url } from 'inspector';
import { Admin } from 'src/app/shared/admin/admin.model';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';
import { Employee } from 'src/app/shared/owner/employee/employee.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  owner = new Owner();
  admin; 
  cUrl;
  placeHolder: string;

  constructor(private _ownerService: OwnerService, 
              private router: Router, 
              private _adminService: AdminService,
              private _employeeService: EmployeeService) { }

  ngOnInit() {
    var currentUrl = this.router.url
    this.cUrl = currentUrl.split('/')[3]

    if(this.cUrl === 'admin') {
     this.admin = new Admin();
     this.placeHolder = "Email Id"
    }
    else {
      this.placeHolder = "Company EmailId"
    }
  }

  onLogin(form: NgForm) {

    
    if(this.cUrl === 'admin') {
      this.admin.emailId = this.owner.companyEmail;
      this.admin.password = this.owner.password;
      this._adminService.login(this.admin)
      
    } 
    else {
      if(form.value.role === undefined) {
        alert('Role cannot be empty')
      }
      if(form.value.role === 'CEO') {
        this._ownerService.login(this.owner)
      }
     else if(form.value.role === 'EMPLOYEE') {
       let emp = new Employee();
       emp.companyEmail = this.owner.companyEmail;
       emp.password = this.owner.password;
        this._employeeService.loginEmployee(emp);
     } 
    }
  }

}

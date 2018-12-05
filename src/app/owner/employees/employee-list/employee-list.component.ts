import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';
import { Employee } from 'src/app/shared/owner/employee/employee.class';
import { MatDialog } from '@angular/material';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { Engineer } from 'src/app/shared/engineer/engineer.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listOfEmployees: Employee[] = [];
  constructor(private _employeeService: EmployeeService,
              private dialog: MatDialog, 
              private _engineerService: EngineerService) { }

  ngOnInit() {
    
    this.getAllEmployees();
  }

  getAllEmployees() {
    
    this._employeeService.getAllEmployees().subscribe((result:any) => {
      
      this.listOfEmployees = result.employees; 
      this.cannotDelete();
    }, error => {
      console.log(error);
    })
  }

  deleteEmployee(id: string) {
  if(confirm('Are you sure to delete this employee? ')) {
    let empD: Employee =  this.listOfEmployees.find(emp => emp._id === id);
    empD.isDeleted = true;
    empD.isDeletedOn = new Date();
    let now = new Date(); 
    var noOfDays = 6 //change this to 6
    
    empD.willBeDeleted = new Date(now.setDate(empD.isDeletedOn.getDate() + noOfDays)); 
    
    this._employeeService.updateEmployee(empD).subscribe((result:any) => {
      console.log(result)
      alert(empD.name + ' will be deleted after a week, If you made a mistake you can undelete the employee');
      this.getAllEmployees();
    })
  }
  
  }

  editEmployee(id: string) {
    let empD: Employee = this.listOfEmployees.find(emp => emp._id === id);
    let ref = this.dialog.open( AddEmployeeComponent, {
      panelClass: 'custom-dialog-container',
      data: empD
    })

    ref.afterClosed().subscribe(result => {

      
    })
  }

  cannotDelete() {
    
    let eng: Engineer[] = [];

    this.listOfEmployees.forEach(element => {
      this._engineerService.getAllEngineers().subscribe((result:any) => {
        eng = result.engineers;
        eng.forEach(eng => {
          if(element._id === eng.hiredBy) {
            element.cannotDelete = true;
          }
        })
      })

     
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/owner/employee/employee.class';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';

@Component({
  selector: 'app-deleted-employees-list',
  templateUrl: './deleted-employees-list.component.html',
  styleUrls: ['./deleted-employees-list.component.scss']
})
export class DeletedEmployeesListComponent implements OnInit {
  listOfDeletedEmployees: Employee[] = []
  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllDeletedEmployees();
  }


  getAllDeletedEmployees() {
    
    this._employeeService.getAllDeletedEmployees().subscribe((result: any) => {
      this.listOfDeletedEmployees = result.employees;
      debugger
      this.listOfDeletedEmployees.forEach(emp => {
        this.deleteIfExpired(emp)
      })
    } , error => {
      console.log(error);
    })

  }

  UnDeleteEmployee(id: string) {
    let empD:Employee = this.listOfDeletedEmployees.find(emp => emp._id === id);
    empD.isDeleted = false;
    empD.isDeletedOn = null;
    empD.willBeDeleted = null;
    
    this._employeeService.updateEmployee(empD).subscribe((result: any) => {
      
      alert('Now the employee has been undeleted');

      this.getAllDeletedEmployees();
    }, error => {
      console.log(error);
    })
  }

  deleteForever(id: string) {
    let empD : Employee = this.listOfDeletedEmployees.find(emp => emp._id === id);
    this._employeeService.deleteForever(id).subscribe(result => {
      console.log(result);
      alert(empD.name + 'has been deleted permanently');
      this.getAllDeletedEmployees();

    }, error => {
      console.log(error);
    })
  }

  deleteIfExpired(emp:Employee) {

    let now = new Date();
    let expDate = new Date(emp.willBeDeleted)
    if(now.getDate() >= expDate.getDate() && now.getMonth() >= expDate.getMonth()) {
    
      this._employeeService.deleteForever(emp._id).subscribe((result:any) => {

        alert(emp.name + ' has been deleted parmenently');
        this.getAllDeletedEmployees();
      }, error => {
        console.log(error);
      })   
    }
  }
}

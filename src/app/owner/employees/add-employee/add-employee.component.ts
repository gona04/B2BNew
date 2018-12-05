import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/owner/employee/employee.class';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee = new Employee();
  password1: string;
  password2: string;
  button: String;
  toPerform: string;
  currentRate = 3;

  cols:any[] = [];
  constructor(private _employeeService: EmployeeService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<Employee>, 
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    console.log(this.data === undefined)
    if(this.data._id){
        console.log(this.data)
        this.employee = this.data
        this.button = "Edit"
    }
    else {
      this.button = "Submit"
    }
   
    this.cols = [
      { field: 'name' },
      { field: 'proficiency'}
  ];
  }


  onSubmit(form: NgForm) {
        if(form.valid){
      
        this.employee.password = this.password1;
                      
    if(!this.employee._id)
   {
    this._employeeService.addEmployee(this.employee).subscribe((result:any) => {
      
      console.log(result);
      alert('Employee added successfully!');
      this.router.navigate(['/']);
    })
  }
      //EDIT
      else {
        this._employeeService.updateEmployee(this.employee).subscribe( result => {

          alert('Employee updated successfully!');
          this.dialogRef.close('Success');
        })
      }
   }
   else {
    return
  }
 
  }

}

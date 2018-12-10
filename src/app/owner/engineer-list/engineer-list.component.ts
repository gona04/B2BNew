import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MatDialog } from '@angular/material';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { Technology } from 'src/app/shared/engineer/technology/technology.model';
import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';
import { EngineerDetailsComponent } from '../engineer-details/engineer-details.component';
import { AddEngineersComponent } from '../add-engineer/add-engineers.component';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';
import { Employee } from 'src/app/shared/owner/employee/employee.class';


@Component({
  selector: 'app-engineer-list',
  templateUrl: './engineer-list.component.html',
  styleUrls: ['./engineer-list.component.scss']
})
export class EngineerListComponent implements OnInit {

  //FOR SMART TABLE
  selectedEngineer: Engineer;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  
  //FOR DATA
  listOfEngineers: Engineer[];
  technoList: Technology[] = [];

  //FOR KNOWING THE PAGE 
  currentURL: string;

  //FOR GIVING EVERY ROLE DIFFERENT COMPONENETS
  role: string;

  //TO GIVE THE EMPLOYEE OF THE COMPANY AND THE OWNER THE SAME RESULTS 
  specificEmp = new Employee();
  constructor(
              private _engineerService: EngineerService, 
              private dialog: MatDialog, 
              private _techService: TechnologyService, 
              private _employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
    this.componenetsToShow();
    this.sortOptions = [
      {label: 'Freashers', value: 'experience'},
      {label: 'Experienced', value: '!experience'}
  ]; 

    this.role = localStorage.getItem("role");
    debugger
    
   
  }

 
  

//FOR SORTING TABLE DATA
onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}



  //TO GET Engineer BY ID
  engineerDetails(id: string) {
    const userDetails = this.listOfEngineers.find(e => e._id === id );
    console.log(userDetails)
    this.dialog.open(EngineerDetailsComponent, {
      panelClass: 'custom-dialog-container',
      data: userDetails
    })
  }

  editEngineer(id: string){
    const userDetails = this.listOfEngineers.find(e => e._id === id );
    const d = this.dialog.open(AddEngineersComponent, {
      
      panelClass: 'custom-dialog-container',
      data: userDetails
})


  }

  //FOR TETMPORARILY DELETING AN ENGINEER
  deleteEngineer(id: string) {
    // alert('id ' + id);
    if(confirm('Are you sure you want to delete this engineer ? ')){
      this._engineerService.deleteEngineer(id).subscribe(result => {
        this.getListofEngineers();
      })
    }
    
  }

  //TO GET THE LIST OF ENGINEERS 
  getListofEngineers(){
    debugger
    this._engineerService.getAllEngineerSpecific().subscribe((result: any)=> {
     this.listOfEngineers = result.engineers.filter(e => e.isDeleted === false);
     this.listOfEngineers.forEach(emp => {  
       this.getAllTechnologies(emp._id);
     })
    
    
    })
  }

  //TO GET ALL TECHNOLOGIES 
  getAllTechnologies(id: string) {
    this._techService.getAlltechnologies(id).subscribe((result:any) => {
      let empD = this.listOfEngineers.find(emp => emp._id === id);
      this.technoList.push(result.name);
    })
  }


  componenetsToShow() {
    let cURL = this.router.url;
    debugger
    this.currentURL = cURL.toString().split('/')[2];
    debugger
    if(this.currentURL === 'list' || this.currentURL === 'engineer-list') {
      this._engineerService.getAllEngineers().subscribe((result: any) => {
        this.listOfEngineers = result.engineers;
      })
    }
    else {
      this.getListofEngineers();
    }
  }


  //HIRE AND UNHIRE LOGIC 

  engineerHire(id: string) {
    this._engineerService.updateEngineers(id, this.role).subscribe(result => {
      this.getListofEngineers();
    })
  }

  unhireButton() {
   
    const id = localStorage.getItem("ID");
    
    this.listOfEngineers.forEach(eng => 
    {
      if(eng.hiredByRole === 'EMPLOYEE') {
        
          this._employeeService.getAllEmployees().subscribe((result: any) => {
            let employees = result.employees;
            this.specificEmp =  employees.forEach(e => {
              if(e._id === eng.hiredBy) {
                eng.showUnhired = true;
              }
            })
            
          })
      }

      if(eng.hiredByRole === 'OWNER') {
        
        this._employeeService.getEmployeeById(eng.hiredBy).subscribe((result:any) => {
          const newId = result.employee[0]._id;
          if(id === newId) {
            eng.showUnhired = true;
          }
        })
      }
      if(eng.hiredBy === id) {
        eng.showUnhired = true;
      }
    }
      )
  }

  unhireEngineer(id: string) {
    let spEng: Engineer = this.listOfEngineers.find(eng => eng._id === id);
    spEng.hiredBy = null;
    spEng.hiredByRole = null;
    
    this._engineerService.unhire(spEng._id, spEng).subscribe(result => {

      this.getListofEngineers();
    })
  }
}

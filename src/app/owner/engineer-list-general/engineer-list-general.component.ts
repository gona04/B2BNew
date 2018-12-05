import { Component, OnInit } from '@angular/core';


import { SelectItem } from 'primeng/components/common/selectitem';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';
import { EngineerDetailsComponent } from '../engineer-details/engineer-details.component';
import { EmployeeService } from 'src/app/shared/owner/employee/employee.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-engineer-list-general',
  templateUrl: './engineer-list-general.component.html',
  styleUrls: ['./engineer-list-general.component.scss']
})
export class EngineerListGeneralComponent implements OnInit {

  specificEmp;
 role: string;
  selectedEngineer: Engineer;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
 
  displayedColumns = ['name', 'technologies' ,'experience', 'rating', 'budget','details'];
  
  dataSource;
  listOfEngineers: Engineer[];
  cols:any[] = []
  
  constructor(private _engineerService: EngineerService, 
    private dialog: MatDialog, 
    private _techService: TechnologyService, 
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.sortOptions = [
      {label: 'Freashers', value: 'experience'},
      {label: 'Experienced', value: '!experience'}
  ]; 
     this.role = localStorage.getItem("role");
    this.getListofEngineers();

   
   
  }

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

 

 

  getListofEngineers(){
    this._engineerService.getAllEngineers().subscribe((result: any)=> {

     this.listOfEngineers = result.engineers.filter(e => e.isDeleted === false);
     
     this.listOfEngineers.forEach(emp => {  
       this.getAllTechnologies(emp._id);
     })
    this.unhireButton();
    })
  }

  getAllTechnologies(id: string) {
    this._techService.getAlltechnologies(id).subscribe((result:any) => {
      let empD = this.listOfEngineers.find(emp => emp._id === id);
    
      console.log('\n\n'+result + '      ' +empD)
    })
  }

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

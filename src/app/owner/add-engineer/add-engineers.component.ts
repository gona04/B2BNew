import { Component, OnInit,  Inject } from '@angular/core';

import { NgForm } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AddTechnologyComponent } from './add-technology/add-technology.component';

import { AddJobsComponent } from './add-jobs/add-jobs.component';

import { Router } from '@angular/router';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { Technology } from 'src/app/shared/engineer/technology/technology.model';
import { Jobs } from 'src/app/shared/engineer/jobs/jobs.model';
import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';
import { JobsService } from 'src/app/shared/engineer/jobs/jobs.service';



@Component({
  selector: 'app-add-engineers',
  templateUrl: './add-engineers.component.html',
  styleUrls: ['./add-engineers.component.scss']
})
export class AddEngineersComponent implements OnInit {
  engineer = new Engineer();
  //TECHNOLOGY
  technology = new Technology();
  techToPrint: Technology[] = [];
  button: String;
  toPerform: string;
  currentRate = 3;

  //JOBS
  jobs: Jobs[] = [];
  cols:any[] = [];
  constructor(private _engineerService: EngineerService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<Engineer>, 
    private dialog: MatDialog,
    private _technologyService: TechnologyService,
    private _jobService: JobsService, 
    private router: Router) { }

  ngOnInit() {
   
    if(this.data._id){

        this.engineer = this.data
        this.button = "Edit"
    
        
        this.getAllTechnologies();
        this.getAllJobs();
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
    
    if(!this.engineer._id)
   {
    this._engineerService.addEngineers(this.engineer).subscribe((result:any) => {

      alert('Engineer added successfully!');
      this.router.navigate(['/']);
    })
  }

      else {
        
 
        
        if(this.engineer.technologiesKnown.length > 0) {
          
          this.engineer.technologiesKnown = [];
          this.techToPrint.forEach(t => {
            this.engineer.technologiesKnown.push(t.name);
          })
        }
        else {
          
          this.techToPrint.forEach(t => {
            this.engineer.technologiesKnown.push(t.name);
          })
        }
        
        this._engineerService.editEngineer(this.engineer._id, this.engineer).subscribe( result => {


          alert('Engineer updated successfully!')
        })
      }
   }

   //TECHNOLOGIES
   addSkills() {
     
    const d = this.dialog.open(AddTechnologyComponent, {
     
        panelClass:'custom-dialog-container',
        data: {
          empId:  this.engineer._id, 
          technology: this.technology,
          toPerform: this.toPerform
        }
      
      })
     
      d.afterClosed().subscribe((result:any) => {

        
       
         this.getAllTechnologies();
      })
   }


   //TECHNOLOGIES 
   getAllTechnologies() {
     
    this._technologyService.getAlltechnologies(this.data._id).subscribe((result:any) => {
       this.techToPrint = result.technologies
       
      })
   }

   //EDIT TECHNOLOGY
   editTechnology(_id: string) {
    this.toPerform = 'EDIT';
    this.technology = this.techToPrint.find(t => t._id === _id);
    
    this.addSkills();
   }

   //DELETE TECHNOLOGY
   deleteTechnology(_id: string) {
     //connect to backend of delete
     alert('In DELETE');
     this._technologyService.deleteTechnology(_id).subscribe((result: any) => {
       alert('Technology deleted successfully');
       this.getAllTechnologies();
     }, error => {
       alert('There was an ineternal error');
     })
   }
  
   //JOBS 
   addJobs() {
    let d = this.dialog.open(AddJobsComponent, {
       panelClass: 'custom-dialog-container',
       data: {
         engineerId: this.engineer._id
       }
     })

     d.afterClosed().subscribe(result => {

       this.getAllJobs();
     })
   }

   getAllJobs() {
    this._jobService.getJobs(this.engineer._id).subscribe((result:any) => {
      this.jobs = result.job;
    })
   }
  }


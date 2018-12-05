import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';
import { Jobs } from 'src/app/shared/engineer/jobs/jobs.model';
import { Technology } from 'src/app/shared/engineer/technology/technology.model';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { JobsService } from 'src/app/shared/engineer/jobs/jobs.service';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';


@Component({
  selector: 'app-engineer-details',
  templateUrl: './engineer-details.component.html',
  styleUrls: ['./engineer-details.component.scss']
})
export class EngineerDetailsComponent implements OnInit {
  engineer;
  jobs: Jobs[] = [];
  technologies: Technology[] = [];
  designation: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Engineer, private _jobService: JobsService, private _techService: TechnologyService) { 
    this.engineer = this.data
   }
  
  ngOnInit() {
    console.log(this.data);
    this._jobService.getJobs(this.engineer._id).subscribe((result:any) => {
      
      this.jobs = result.job;
      this.jobs.forEach(j => {
        if(j.till === "Till Date") {
          this.designation = j.desgnation;
        }
      })
    })
    this._techService.getAlltechnologies(this.engineer._id).subscribe((result:any) => {
      
      this.technologies = result.technologies;
    })
  }

  downloadPdf() {
    const elementToPrint = document.getElementById('foo'); //The html element to become a pdf
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      const name = this.data.firstName;
        pdf.save(name +'.pdf');
    });
  }
}
import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Jobs } from 'src/app/shared/engineer/jobs/jobs.model';
import { JobsService } from 'src/app/shared/engineer/jobs/jobs.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent implements OnInit {
  disable: boolean;
  job = new Jobs();
  buttonName: string;
  constructor(private _jobService: JobsService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    this.disable = false;
    this.editOrAdd();
  }

  onSubmit(form : NgForm){
    if(!form.valid) {
      return 
    }
    else {
        if(this.buttonName === 'SUBMIT') {
          this.job.engineerId = this.data.engineerId;
          console.log(this.job);
          this._jobService.addJobs(this.job).subscribe(result => {
            debugger
          console.log(result);
          this.dialogRef.close();
        })    
        }
      else {
        this._jobService.editJobs(this.job).subscribe((result:any) => {
            alert(result.message)
        })
      }
    }
 
  }

  selected(event: any) {
    console.log(event)
    if(event.checked) {
      this.disable = true
    }
    else {
      this.disable = false
    }
   }

   editOrAdd () {
     if(this.data.job) {
      this.buttonName = 'EDIT';
      this.job = this.data.job
     }
     else{ 
       this.buttonName = 'SUBMIT';
     }
   }
}

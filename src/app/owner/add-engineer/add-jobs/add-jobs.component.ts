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
  constructor(private _jobService: JobsService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    this.disable = false;

  }

  onSubmit(form : NgForm){
    if(!form.valid) {
      return 
    }

    this.job.employeeId = this.data.employeeId;
    console.log(this.job);
    this._jobService.addJobs(this.job).subscribe(result => {
      console.log(result);
      this.dialogRef.close('saved successfully')
    })
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
}

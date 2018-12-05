import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Technology } from 'src/app/shared/engineer/technology/technology.model';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';
import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {
  technology = new Technology();
  emp:Engineer;
  constructor( @Inject(MAT_DIALOG_DATA) public data, public dailogRef: MatDialogRef<any>, private _techService: TechnologyService) { }

  ngOnInit() {
    console.log(this.data);
    if(this.data.technology._id) {
      console.log(this.data);
      
      this.technology = this.data.technology
    }
  }
  onSubmit(reasonToReject: NgForm) {
    if( reasonToReject.invalid) {
      return 
    }
    else {
      
    }
  }
            onClose(proficeincy: string) {
              //ADD
              if(!this.data.technology._id) {
                
              console.log(proficeincy);
                console.log(this.technology);
                this.technology.proficiency = proficeincy;
                this.technology.employeeId = this.data.empId;
                this._techService.addTechnoloy(this.technology).subscribe((result:any) => {
                  alert(result.message);  
                  this.dailogRef.close('Technology added successfully')
                }) 
              }
              else {
                
                const id = this.technology._id;
                this.technology.proficiency = proficeincy
                this._techService.updateTechnology(id , this.technology).subscribe(result => {
                  
                  console.log(result)
                  
                  this.dailogRef.close('Technology updated successfully')
                })
              }
            }

        
}

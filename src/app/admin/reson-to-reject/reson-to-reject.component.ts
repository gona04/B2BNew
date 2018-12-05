import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reson-to-reject',
  templateUrl: './reson-to-reject.component.html',
  styleUrls: ['./reson-to-reject.component.scss']
})
export class ResonToRejectComponent implements OnInit {

  message: string = "Doesn't seem authentic"
  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return 
    }
    else {
      if(!this.message) {
        this.message = "Dose not seem authentic" 
      this.dialogRef.close(this.message);
      }
      this.dialogRef.close(this.message)
    }
    }
  

  onClose() {
    this.message = "Dose not seem authentic";
    this.dialogRef.close( this.message );
  }

}

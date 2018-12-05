import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { Owner } from 'src/app/shared/owner/owner.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { Subject } from 'rxjs';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  
  owner:Owner;
  password1: string;
  password2: string;
  recaptcha
  constructor(private _ownerService: OwnerService, 
              private router: Router, private messageService: MessageService) { 
              }

  ngOnInit() { 
    this.recaptcha = (window as any).grecaptcha;
    if(!this.owner) {
      this.owner = new Owner();
    }

   
  }

  onSubmit(from: NgForm) {
  
    
    if(from.invalid) {
      
      return
    }
    else {
      
      this.owner.role = 'OWNER'
      this.owner.password = this.password1;
  
      this._ownerService.signup(this.owner);
      this._ownerService.ownersAdded.subscribe(() => {
        this.messageService.add({ summary: 'Success Message', detail:'Your entry has been sent for varification. Only once you are varified you will be able to login'});
        
      })
      from.resetForm();
    }
  }

  lowerCase(event) {
    console.log(event)
  }


}



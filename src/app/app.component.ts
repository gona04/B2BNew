import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { LoginService } from './shared/login/login.service';
import { MatSnackBar } from '@angular/material';
import { OwnerService } from './shared/owner/owner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  companyAdded;
  // recaptcha;
  constructor(private _login: LoginService, private snackBar: MatSnackBar, private _ownerService: OwnerService) {
 
  }
  rejectedId: string;
  role: string;
  id: string;
  ngOnInit() {
    // this.recaptcha = (window as any).grecaptcha;
    this.id = localStorage.getItem("ID");
    this._login.autoAuthOwner();
    this.role = this._login.getRole();  
    
    
    this.getsnackbar();
    
  }

  getsnackbar() {
    
    
    const socket = io('http://localhost:3000/');
socket.on('newCEO', data => {
 if(data.action === 'create') {
   
  this.companyAdded = data.user;

  
  if(this.role === 'ADMIN') {
    setTimeout(() => {
      debugger
      this.snackBar.open('Company', this.companyAdded.companyName, {
        duration: 20000,
      })
   
    } , 0)
   
     
  }
 }
 this._ownerService.getListOwners()
})

// socket.on('authentication' , data => {
//   if(data.action === 'rejected') {
//     this.rejectedId = data.user._id;
//     if(this.rejectedId === this.id) {
//       setTimeout(() => {
//         this.snackBar.open('Rejected', data.user.companyName, {
//           duration: 20000,
//         })
     
//       } , 0)
//     }
//   }
// })
  // if(this.role === 'ADMIN') {
    
  // }
  }

 
}

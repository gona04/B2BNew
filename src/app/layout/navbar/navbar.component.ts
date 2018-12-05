import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login/login.service';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { Owner } from 'src/app/shared/owner/owner.model';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  socket;
  isAuthenticated: boolean;
  role: string;
  listOfOwners:Owner[] =[];
  numberOfUnseen: number = 0;
  todisplay:string[];
  page: string;
  addedCompanies: string[] = [];
  timeout;
  constructor(private router: Router, 
              private _login: LoginService,
              private _ownerService: OwnerService) { 
              }
  
  ngOnInit() {
    

    const updated = this.valuesIfupdated()
    if(!updated){
      
      this.valuesToDisplay();
    }
    this.getAllOwners();
  
   
  }

  //LOGGING OUT
  logout() {
      this._login.logout();
  }

  //GETTING THE AUTH STATUS AND SENDING TO THE PAGES ACCORDINGLY
  valuesToDisplay() {
    let r;
    this.isAuthenticated = this._login.getAuthStatus();    
    this._login.getUpdatedRole().subscribe(result => {
      this.role = result
    })
    r = localStorage.getItem('role');
    
    if(this.isAuthenticated === true) {
      this.role = r.toUpperCase();
      const pageTogo = this.role.toLowerCase();
      this.page = pageTogo
    this.router.navigate([pageTogo])
  
    }
  }

  //GETTING THE VALUES 
  valuesIfupdated() {
    
    this._login.getAuthStatusListerner().subscribe(result =>{
      this.isAuthenticated = result
    })
    if(this.isAuthenticated){
      
    this._login.getUpdatedRole().subscribe(result => {
      this.role = result
    })
    if(this.isAuthenticated && this.role) {
      
      return true
    }
  }
  }



  getAllOwners() {
      this._ownerService.getOwners().subscribe(result => {
        this.listOfOwners = result;
        if(this.numberOfUnseen !== 0 || this.addedCompanies !== null || this.addedCompanies !== undefined) {
          this.numberOfUnseen = 0;
          this.addedCompanies = [];
        }
        this.getNumerOfUnseen();
        
      });
      
  }

  getNumerOfUnseen() {
    
    this.listOfOwners.forEach(owner => {
        
        if(owner.isSeen === false ||  owner.isSeen === undefined){
          this.numberOfUnseen = this.numberOfUnseen + 1;
          this.addedCompanies.push(owner.companyName);
          
        }
      
    })
  }
getNotiification() {
  

 
  const socket = io('http://localhost:3000/');
socket.on('newCEO', data => {
if(data.action === 'create') {
      this.getAllOwners();
        }

    })

  }
    
  notify() {
    this.timeout = setTimeout(() => {
      
       this.listOfOwners.forEach(own => {
         
        if(own.isSeen === false || own.isSeen === undefined) {
          
          own.isSeen = true;
          this._ownerService.updateOwner(own._id,own).subscribe(()=> {
  
            this.numberOfUnseen = 0;
            this.addedCompanies = [];
 
          })
        }
       
       } )

       
    
    },  3000)

  } 

}

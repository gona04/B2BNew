import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from './owner.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { environment } from '../../../environments/environment';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';


@Injectable()
export class OwnerService {
  private BASE_URL: string = environment.apiUrl + "owner/";
  
  ownersAdded = new Subject<any>();
  cast;
  ownerId:string;
  companyAdded;
  listOfOwners: Owner[] = [];
  updateOwners = new Subject<Owner[]>();
  constructor(private http: HttpClient, 
              private router: Router, 
              private _login: LoginService) { 
               }
 
  //FOR REGISTERING THE OWNER
  signup(owner: Owner) {
    
    return this.http.post(this.BASE_URL +'signup', owner).subscribe(result => {
      const owner = result;
     
      //TO NOTIFY ADMIN
      this.ownersAdded.next(owner);
      
      this.cast = this.ownersAdded.asObservable();

     
      
      this.router.navigate(['howItWorks'])
     
    }, error => {
      console.log(error);
    })
  } 



  //FOR LOGGIN IN THE OWNER
  login(owner: Owner) {
    
    this.http.post( this.BASE_URL + 'login', owner).subscribe((result:any) => {

      //IF USER IS VARIFIED AND 
      if(result.isVarified === 'VARIFIED' && result.isDeleted == false) {
        
        const token = result.token;
        const role = result.role;
        this._login.setToken(token);
        this._login.setRole(role)

        
        this._login.setAuthTimer(result.expiresIn);
        const now = new Date;
        const expDate = new Date(now.getTime() + result.expiresIn * 1000);
         //ADD VALUES TO LOCAL STORAGE
        this._login.saveAuthenticationDetails(this._login.getToken(), expDate , this._login.getRole(), result.id);
        // this.ownerId = result.id;
        // localStorage.setItem('ownerId', this.ownerId);
        
        const pageToGo = this._login.getRole().toLowerCase()
        this.router.navigate([pageToGo])
        alert('loggedin successfully')
      }
      // IF THE OWNER HAS BEEN DELETED
      else if(result.isDeleted === true) {
        alert("Please signup again!");
      }
      //IF THE OWNER IS NOT VARIFIED
      else if(result.isVarified === 'PENDING' || result.isVarified === 'REJECTED') {
        alert('Request not varified yet!');
        this.router.navigate(['howItWorks'])
      }
      //IF THE OWNER IS NOT AUTHENTICATED
      else {
        alert('Invalid username & password please signup')
      }
    },
    //IF SOME ERROR OCCURED 
    error => {
      console.log(error)
      alert('Please enter valid emailid and password');
    })
  }


  getListOwners()  {
     this.http.get(this.BASE_URL+ 'getlistOfOwners').subscribe((result:any) => {
       
      this.listOfOwners = result.owners;
      this.updateOwners.next([...this.listOfOwners]);
      
    });
  }


  updateOwner(id: string, owner: Owner) {
    return this.http.put(this.BASE_URL + 'updateOwner/' + id, owner);
  }
  

  getOwnerId() {
    return this.ownerId 
  }

  getOwners() {
    return this.updateOwners.asObservable();
  }

  setOwners(owner: Owner) {
    this.listOfOwners.forEach(own => {
     if( own._id === owner._id) {
       own = owner;
     }
    });

    this.updateOwners.next([...this.listOfOwners]);
  }
}

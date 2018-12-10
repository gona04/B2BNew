import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/shared/login/login.service';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { Owner } from 'src/app/shared/owner/owner.model';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { ResonToRejectComponent } from '../reson-to-reject/reson-to-reject.component';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  role;
  displayedColumns = ['companyName', 'ceoNAME' , 'mobileNo' ,'varify']
  listOfOwners: Owner[] = []; 
  dataSource;

  constructor(private _login: LoginService, 
    private _ownerService: OwnerService, 
    private dialog: MatDialog) { }

  ngOnInit() {
   
  this.role = this._login.getRole();

    this._login.setRole(this.role);
  
    
    this.getListOfOwners();
    
  }

  getListOfOwners() {
    this._ownerService.getListOwners();
    this.getListOfOwners2();
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  varifyOwner(id: string) {

    const owner = this.getOwnerById(id);
    owner.isVarified = 'VARIFIED';
    owner.isSeen = true;

    this._ownerService.updateOwner(id, owner).subscribe(result => {

      alert('Owner has been varified!');
      this._ownerService.setOwners(owner);
    }, error => {

      alert('Some internal error occured try later');
    })
  }

  rejectOwner(id: string) {

    if(confirm('Are you sure you want to reject this company? ')) {
      const d = this.dialog.open(ResonToRejectComponent, {
       panelClass: 'custom-dialog-container'
      })

      d.afterClosed().subscribe(result => {
        let owner = this.getOwnerById(id);
        owner.reasonToreject = result;
        
        owner.isVarified = 'REJECTED';
        owner.isSeen = true;
        this._ownerService.updateOwner(id, owner).subscribe(result => {

          
          alert('Owner is rejected');
          // this.getListOfOwners();
          // this.getListOfOwners2();
          this._ownerService.setOwners(owner);
          
        }, error => {

          alert('Some internal error occured try later')
        })
      })
    }
  }

  getOwnerById(id: string) {
    return this.listOfOwners.find(own => own._id === id);
  }

 getListOfOwners2() {
  this._ownerService.getOwners().subscribe( result => { 
    this.listOfOwners = result;

    this.dataSource = new MatTableDataSource(this.listOfOwners);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  })
}
}


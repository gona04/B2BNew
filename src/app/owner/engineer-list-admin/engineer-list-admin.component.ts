import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';

import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { TechnologyService } from 'src/app/shared/engineer/technology/technology.service';
import { EngineerDetailsComponent } from '../engineer-details/engineer-details.component';
import { AddEngineersComponent } from '../add-engineer/add-engineers.component';
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'app-engineer-list-admin',
  templateUrl: './engineer-list-admin.component.html',
  styleUrls: ['./engineer-list-admin.component.scss']
})
export class EngineerListAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
 
  selectedEngineer: Engineer;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  displayedColumns = ['name', 'technologies' ,'experience', 'rating', 'budget','details', 'actions'];
 
  dataSource;
  listOfEngineers: Engineer[];

  constructor(private _engineerService: EngineerService, private dialog: MatDialog, 
    private _techService: TechnologyService) { }

  ngOnInit() {
    
    this.sortOptions = [
      {label: 'Freashers', value: 'experience'},
      {label: 'Experienced', value: '!experience'}
  ]; 
    this.getListofEngineers();
   
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  //TO GET Engineer BY ID
  engineerDetails(id: string) {
    const userDetails = this.listOfEngineers.find(e => e._id === id );

    this.dialog.open(EngineerDetailsComponent, {
      panelClass: 'custom-dialog-container',
      data: userDetails
    })
  }

  editEngineer(id: string){

const userDetails = this.listOfEngineers.find(e => e._id === id );
const d = this.dialog.open(AddEngineersComponent, {
  // width:'600px',
  // height: '1000px',
  panelClass: 'custom-dialog-container',
  data: userDetails
})
const e = new Engineer();
this._engineerService.editEngineer(id, e).subscribe(result => {
  console.log(result)
})
  }

  deleteEngineer(id: string) {
    // alert('id ' + id);
    if(confirm('Are you sure you want to delete this engineer ? ')){
      this._engineerService.deleteEngineer(id).subscribe(result => {
        
  
        this.getListofEngineers();
      })
    }
    
  }

  getListofEngineers(){
    this._engineerService.getAllEngineers().subscribe((result: any)=> {

     this.listOfEngineers = result.engineers.filter(e => e.isDeleted === false);
     
     this.listOfEngineers.forEach(emp => {  
       this.getAllTechnologies(emp._id);
     })
    
     this.dataSource = new MatTableDataSource(this.listOfEngineers);
     this.dataSource.sort = this.sort;
    })
  }

  getAllTechnologies(id: string) {
    this._techService.getAlltechnologies(id).subscribe((result:any) => {
      let empD = this.listOfEngineers.find(emp => emp._id === id);
    
      console.log('\n\n'+result + '      ' +empD)
    })
  }


}

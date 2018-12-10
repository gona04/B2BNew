import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort, MatTableDataSource } from '@angular/material';

import { EngineerService } from 'src/app/shared/engineer/engineer.service';
import { Engineer } from 'src/app/shared/engineer/engineer.model';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-deleted-engineers',
  templateUrl: './deleted-engineers.component.html',
  styleUrls: ['./deleted-engineers.component.scss']
})
export class DeletedEngineersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns = ['name', 'technologies' ,'deletedOn', 'willBeDeletedOn', 'actions'];
  constructor(private _engineerService: EngineerService) { }

  willBeDeletedOn;

  dataSource;
  deletedEngineers: Engineer[];

  
  selectedEngineer: Engineer;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  ngOnInit() {
    this.getAllDeletedEngineers();
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

  getAllDeletedEngineers() {
    this._engineerService.getAlldeletedEngineers().subscribe((result:any) => {
      
      this.deletedEngineers = result.engineers
      const now = new Date();
      this.deletedEngineers.forEach(engineer => {
        this.willBeDeletedOn = new Date(engineer.willBeDeleted)
        
        
        console.log(now.getDate() + '       ' + this.willBeDeletedOn.getDate() + now.getMonth() + '    ' + this.willBeDeletedOn.getMonth())
        if(now.getDate() >= this.willBeDeletedOn.getDate() && now.getMonth >= this.willBeDeletedOn.getMonth()) {
          
          console.log('this should be deleted');
          this._engineerService.permanentDelete(engineer._id).subscribe((result: any) => {
            console.log(result);
            alert('There were some engineers deleted today!')
          })
        }
      });
      console.log(this.deletedEngineers);
      this.dataSource = new MatTableDataSource(this.deletedEngineers);
      this.dataSource.sort = this.sort;
   
    });
  }

  //TO APPLY SORTIG TO THE TABLE
  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //TO UDELTE A Engineer
  UnDeleteEngineer(id: string) {
    // alert('In undelete');
    this._engineerService.undeleteEngineer(id).subscribe((result:any) => {
      console.log(result);
      alert(result.message)
      this.getAllDeletedEngineers()
    })
  }

  deleteForever(id: string) {
    if(confirm('Are you sure you want to permanently delete this engineer?')) {
      
    this._engineerService.permanentDelete(id).subscribe((result:any) => {
      alert(result.message);
      this.getAllDeletedEngineers()
    })
    }
  }

} 

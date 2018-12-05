import { NgModule } from "@angular/core";
import { EngineerListComponent } from './engineer-list/engineer-list.component';
import { AddEngineersComponent } from './add-engineer/add-engineers.component';
import { EngineerDetailsComponent } from './engineer-details/engineer-details.component';
import { AddTechnologyComponent } from './add-engineer/add-technology/add-technology.component';
import { AddJobsComponent } from './add-engineer/add-jobs/add-jobs.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { DeletedEmployeesListComponent } from './employees/deleted-employees-list/deleted-employees-list.component';
import { DeletedEngineersComponent } from './deleted-engineers/deleted-engineers.component';
import { FilterPipe } from "../shared/filter.pipe";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../shared/custom-material/custom-material.module";
import { CustomAngularMaterialModule } from "../shared/custom-material/custom-angular-bootstrap.module";
import { CustomPrimeNgModule } from "../shared/custom-material/custom-primeNg.module";
import { OwnerRouting } from "./owner-routing.module";

@NgModule({
    declarations:[
        EngineerListComponent,
        AddEngineersComponent,
        EngineerDetailsComponent,
        DeletedEngineersComponent,
        AddTechnologyComponent,
        AddJobsComponent,
        FilterPipe,
        EmployeeListComponent,
        AddEmployeeComponent,
        DeletedEmployeesListComponent
    ],
    imports: [
        CommonModule,FormsModule, 
        OwnerRouting, CustomMaterialModule,
        CustomPrimeNgModule, CustomAngularMaterialModule
],
    entryComponents: [EngineerDetailsComponent, 
        AddEngineersComponent,  
        AddTechnologyComponent,
        AddJobsComponent, 
        AddEmployeeComponent ],
        
})
export class OwnerModule {}
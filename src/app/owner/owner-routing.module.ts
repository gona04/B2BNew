import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EngineerListGeneralComponent } from "./engineer-list-general/engineer-list-general.component";
import { EngineerListComponent } from "./engineer-list/engineer-list.component";
import { AddEngineersComponent } from "./add-engineer/add-engineers.component";
import { DeletedEngineersComponent } from "./deleted-engineers/deleted-engineers.component";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";
import { AddEmployeeComponent } from "./employees/add-employee/add-employee.component";
import { DeletedEmployeesListComponent } from "./employees/deleted-employees-list/deleted-employees-list.component";

const routes: Routes = [
    {path: '', pathMatch:'full' ,redirectTo: 'list'},
    {path: 'list', component: EngineerListGeneralComponent},
    {path: 'splist', component: EngineerListComponent},
    {path: 'registerEngineer', component: AddEngineersComponent},
    {path: 'deletedEngineers', component: DeletedEngineersComponent},
    {path: 'listEmployee', component: EmployeeListComponent},
    {path: 'registerEmployee', component: AddEmployeeComponent},
    {path: 'deletedEmployees', component: DeletedEmployeesListComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class OwnerRouting {}
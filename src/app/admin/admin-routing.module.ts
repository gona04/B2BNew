import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OwnerListComponent } from "./owner-list/owner-list.component";
import { EngineerListAdminComponent } from "../owner/engineer-list-admin/engineer-list-admin.component";

const routes: Routes = [ 
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: OwnerListComponent},
    {path: 'engineer-list', component: EngineerListAdminComponent}
 ]

@NgModule({
imports: [ 
    RouterModule.forChild(routes)
],
exports: [
    RouterModule
]
})
export class AdminRoutingModule {}
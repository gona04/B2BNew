import { NgModule } from "@angular/core";
import { OwnerListComponent } from './owner-list/owner-list.component';
import { ResonToRejectComponent } from './reson-to-reject/reson-to-reject.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule} from "./admin-routing.module";
import { CustomMaterialModule } from "../shared/custom-material/custom-material.module";
import { CustomPrimeNgModule } from "../shared/custom-material/custom-primeNg.module";
import { CustomAngularMaterialModule } from "../shared/custom-material/custom-angular-bootstrap.module";
import { EngineerListAdminComponent } from "../owner/engineer-list-admin/engineer-list-admin.component";


@NgModule({
    declarations: [
        OwnerListComponent, ResonToRejectComponent,
        EngineerListAdminComponent
    ], 
    imports: [CommonModule,FormsModule, 
              AdminRoutingModule, CustomMaterialModule,
              CustomPrimeNgModule, CustomAngularMaterialModule],
    entryComponents: [ResonToRejectComponent]

})
export class AdminModule {}
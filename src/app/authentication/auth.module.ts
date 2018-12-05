import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth.routing-module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CustomMaterialModule } from "../shared/custom-material/custom-material.module";
import { CustomPrimeNgModule } from "../shared/custom-material/custom-primeNg.module";
import { SignupComponent } from "./signup/signup.component";
import { CustomAngularMaterialModule } from "../shared/custom-material/custom-angular-bootstrap.module";

@NgModule({
    declarations:[LoginComponent ,SignupComponent],
    imports: [
              CommonModule,FormsModule, 
              AuthRoutingModule, CustomMaterialModule,
              CustomPrimeNgModule, CustomAngularMaterialModule
    ],
})
export class AuthModule {}
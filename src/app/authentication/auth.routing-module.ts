import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupAuth } from "../shared/auth.signup";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {path: 'signup', component:SignupComponent, canActivate:[SignupAuth]},
    {path: 'login', component: LoginComponent, canActivate:[SignupAuth]},
    {path: 'login/admin', component: LoginComponent , canActivate: [SignupAuth]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthRoutingModule{}

// DELETE THIS 
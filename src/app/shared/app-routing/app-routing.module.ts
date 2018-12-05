import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SignupComponent } from 'src/app/authentication/signup/signup.component';
import { HowItWorksComponent } from 'src/app/how-it-works/how-it-works.component';

import { AuthGaurds } from '../auth.gaurds';
import { SignupAuth } from '../auth.signup';



const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'auth/signup', canActivate:[SignupAuth]},
  {path: 'auth', loadChildren: 'src/app/authentication/auth.module#AuthModule'},
  {path: 'howItWorks', component: HowItWorksComponent},
  {path: 'owner' , canActivate:[AuthGaurds] , loadChildren: 'src/app/owner/owner.module#OwnerModule'},
  {path: 'admin', canActivate:[AuthGaurds], loadChildren:'src/app/admin/admin.module#AdminModule'},
  {path: 'employee', redirectTo: 'owner'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurds, SignupAuth]
})
export class AppRoutingModule { }

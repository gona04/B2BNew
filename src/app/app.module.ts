import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from './authentication/signup/signup.directives';
import { EqualEmail } from './shared/EqualValidator.directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './shared/custom-material/custom-material.module';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { InterceptorService } from './shared/interceptor.service';
import { OwnerService } from './shared/owner/owner.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { MessageService } from 'primeng/components/common/messageservice';
import { CustomAngularMaterialModule } from './shared/custom-material/custom-angular-bootstrap.module';
import { CustomPrimeNgModule } from './shared/custom-material/custom-primeNg.module';
import { EngineerService } from './shared/engineer/engineer.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EqualValidator,
    EqualEmail,
    HowItWorksComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    CustomAngularMaterialModule,
    CustomPrimeNgModule,
  ],
  providers: [ OwnerService, EngineerService,     
                MessageService,
               { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
               { provide: MAT_DIALOG_DATA, useValue: {} },
               { provide: MatDialogRef, useValue: {} },
           ],
  bootstrap: [AppComponent],
})
export class AppModule { }

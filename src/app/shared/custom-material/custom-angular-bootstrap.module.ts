import { NgModule } from '@angular/core';
import {NgbModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
// MDB Angular Free
import { CheckboxModule, WavesModule, 
          ButtonsModule, InputsModule, 
          IconsModule, CardsFreeModule, } from 'angular-bootstrap-md'
          import { Ng5SliderModule } from 'ng5-slider';

          

@NgModule({
  imports: [
            CheckboxModule, WavesModule,
            ButtonsModule, InputsModule, 
            IconsModule, CardsFreeModule,
            Ng5SliderModule,NgbModule,
            NgbRatingModule,
          ],
            
 exports: [
          CheckboxModule, WavesModule, 
          ButtonsModule, InputsModule, 
          IconsModule, CardsFreeModule,
          Ng5SliderModule, NgbModule,
          NgbRatingModule, 
        ],


})
export class CustomAngularMaterialModule { }

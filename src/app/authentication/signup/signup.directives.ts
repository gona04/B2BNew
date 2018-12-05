import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { MessageService } from "primeng/components/common/messageservice";

@Directive({
    selector:'[validateEqual]',
    providers:[
        MessageService,
        {
        provide: NG_VALIDATORS,
        useExisting: EqualValidator,
        multi: true
    }]
})
export class EqualValidator implements Validator {
    @Input() validateEqual: string;
    validate(control: AbstractControl): {[key: string]: any} | null  {
        const controlToCompare = control.parent.get(this.validateEqual);
     
        if(controlToCompare &&  controlToCompare.value !== control.value) {
            return{'notEqual': true};
        }
       
        return null;
    }

 
  
}
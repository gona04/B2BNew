import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
    selector:'[validateEqualEmail]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: EqualEmail,
        multi: true
    }]
})
export class EqualEmail implements Validator {
    @Input() validateEqualEmail: string;
    validate(control: AbstractControl): {[key: string]: any} | null  {
     
        const controlToCompare = control.parent.get(this.validateEqualEmail);
        if(controlToCompare && controlToCompare.value === control.value) {
            return {'Equal': true}
        }
        return null;
    }

 
}
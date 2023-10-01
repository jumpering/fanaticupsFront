import { AbstractControl } from "@angular/forms";

export class CustomValidators{

    static isXaviNameValidator(control: AbstractControl){
        const value = control.value;
        if(value !== 'xavi'){
            return{ isXaviNameValidator: true }
        }
        return null;
    }    
}
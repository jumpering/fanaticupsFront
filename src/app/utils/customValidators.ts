import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators{

    static isXaviNameValidator(control: AbstractControl){
        const value = control.value;
        if(value !== 'xavi'){
            return{ isXaviNameValidator: true }
        }
        return null;
    }   
    
    static isMatchingPasswords(form: AbstractControl){
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        const currentErrors = form.get('confirmPassword')?.errors;
        const confirmControl = form.get('confirmPassword');
        if(password === confirmPassword){
            confirmControl?.setErrors(null);
            return null;
            
        }
        confirmControl?.setErrors({...currentErrors, mismatch: true});
        return {mismatch: true};
    }

}
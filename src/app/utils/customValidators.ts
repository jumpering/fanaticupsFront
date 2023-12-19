import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CupService } from "@cup/services/cup.service";
import { map } from "rxjs";

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

    static existCupName(cupService: CupService){ //async validator, send function clousure
        return (control: AbstractControl) => {
            const name = control.value;
            return cupService.existCupName(name).pipe(
                map(existCupName => {
                    if(existCupName){
                        return { existCupName: true }
                    }
                    return null;
                })
            );
        }
    }

    

}
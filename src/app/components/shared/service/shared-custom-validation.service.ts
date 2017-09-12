import {Injectable} from '@angular/core';
import {Validators, AbstractControl, ValidatorFn} from '@angular/forms';

@Injectable()
export class SharedCustomValidationService {

    //Variables

    //Constructor parameters
    static get parameters() {
        return [];
    }

    //Constructor
    constructor() {


    }

    //Custom Methods
    alphaNumeric(message: string): ValidatorFn {
        return function (control: AbstractControl) {
            var pattern  = /[^0-9a-zA-Z]/i;
            if(!pattern.test(control.value)) {
                return null;
            }
            
            return {
                alphaNumeric: {
                    message: message || 'Only alphabets and numbers are allowed!',
                }
            };
        };
    }
}
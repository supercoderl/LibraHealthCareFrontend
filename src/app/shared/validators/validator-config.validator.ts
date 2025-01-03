import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from "@angular/forms";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { ERROR_MESSAGES } from "../errors/error-message";

export type ErrorsOptions = { [key: string]: string } & Record<string, NzSafeAny>;
export type ValidationErrors = Record<string, ErrorsOptions>;

export class CustomValidators extends Validators {
    static override minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (Validators.minLength(minLength)(control) === null) {
                return null;
            }

            const currentLanguage = 'en';

            return { minLength: { [currentLanguage]: ERROR_MESSAGES[currentLanguage].minLength.replace('{0}', minLength.toString()) } }
        }
    }

    static override maxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (Validators.minLength(maxLength)(control) === null) {
                return null;
            }

            const currentLanguage = 'en';

            return { maxLength: { [currentLanguage]: ERROR_MESSAGES[currentLanguage].maxLength.replace('{0}', maxLength.toString()) } }
        }
    }

    static mobile(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (isEmptyInputValue(value)) return null;

        const currentLanguage = 'en';

        return isMobile(value) ? null : { mobile: { [currentLanguage]: ERROR_MESSAGES[currentLanguage].mobile } }
    }
}

export const confirmValidator = (fb: UntypedFormGroup, control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) return { error: true, required: true };
    if (control.valid !== fb.controls["password"].value) return { confirmed: true, error: true }
    return {};
}

function isEmptyInputValue(value: NzSafeAny): boolean {
    return value === null || value.length === 0;
}

function isMobile(value: string): boolean {
    return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
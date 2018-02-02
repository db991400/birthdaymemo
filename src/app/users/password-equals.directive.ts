import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

//判断密码和重复密码输入是否相等,如果相等返回null，如果不相等返回control.value
export function passwordEquals(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const isEquals = (password === control.value);
        return isEquals ? null : { 'comparePassword': control.value };
    }
}

@Directive({
    selector: '[comparePassword]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordEqualsDirective, multi: true }]
})
export class PasswordEqualsDirective implements Validator {
    @Input() comparePassword: string;
    validate(control: AbstractControl): {[key: string]:any}{
        return this.comparePassword ? passwordEquals(this.comparePassword)(control) : null;
    }
}


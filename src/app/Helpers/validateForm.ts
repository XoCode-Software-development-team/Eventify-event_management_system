import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class ValidateForm {
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
      const isValidLength = value.length >= 8;

      const passwordValid =
        hasUpperCase &&
        hasLowerCase &&
        hasNumeric &&
        hasSpecialCharacter &&
        isValidLength;

      if (!passwordValid) {
        return {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecialCharacter,
            isValidLength,
          },
        };
      }

      return null;
    };
  }
}

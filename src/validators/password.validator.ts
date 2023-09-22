import Validator from './validator';
import './string.validators';

declare module './validator' {
    interface Validator {
        meetsPasswordRequirements(): Validator;
        containsNumber(): Validator;
        containsCapitalLetter(): Validator;
        containsLowerCaseLetter(): Validator;
        containsSpecialCharacters(): Validator;
    }
}

//@ts-ignore
Validator.prototype.meetsPasswordRequirements = function () {
    if (this.valid) {
        this.isNotNullOrUndefined(this.value)
            .isAString()
            .hasLengthGreaterThan(7)
            .containsCapitalLetter()
            .containsLowerCaseLetter()
            .containsSpecialCharacters();
    }
    return this;
};

//@ts-ignore
Validator.prototype.containsCapitalLetter = function () {
    if (this.valid) {
        this.valid = /[A-Z]/.test(this.value);
        if (!this.valid) {
            this.error = `Must contain a capital letter.`;
        }
    }
    return this;
};

//@ts-ignore
Validator.prototype.containsNumber = function () {
    if (this.valid) {
        this.valid = /\d/.test(this.value);
        if (!this.valid) {
            this.error = `Must contain a number.`;
        }
    }
    return this;
};

//@ts-ignore
Validator.prototype.containsLowerCaseLetter = function () {
    if (this.valid) {
        this.valid = /[a-z]/.test(this.value);
        if (!this.valid) {
            this.error = `Must contain a loercase letter.`;
        }
    }
    return this;
};

//@ts-ignore
Validator.prototype.containsSpecialCharacters = function () {
    if (this.valid) {
        this.valid = /\W/.test(this.value);
        if (!this.valid) {
            this.error = `Must contain a special character.`;
        }
    }
    return this;
};

export default Validator;

import Validator from './validator';

declare module './validator' {
    interface Validator {
        isAString(): Validator;
        hasLengthGreaterThan(value: number): Validator;
        hasLengthLessThan(value: number): Validator;
    }
}

//@ts-ignore
Validator.prototype.isAString = function () {
    if (this.valid) {
        this.valid = typeof this.value === 'string';
        if (!this.valid) {
            this.error = `This is not a string.`;
        }
    }
    return this;
};

//@ts-ignore
Validator.prototype.hasLengthGreaterThan = function (value: number) {
    this.isAString();
    if (this.valid) {
        this.valid = this.value.length > value;
        if (!this.valid) {
            this.error = `Must be longer than ${value} characters.`;
        }
    }
    return this;
};

//@ts-ignore
Validator.prototype.hasLengthLessThan = function (value: number) {
    this.isAString();
    if (this.valid) {
        this.valid = this.value.length < value;
        if (!this.valid) {
            this.error = `Must be shorter than than ${value} characters.`;
        }
    }
    return this;
};

export default Validator;

enum Operator {
    equalTo = 'equal to',
    greaterThan = 'greater than',
    lessThan = 'less than',
    greaterThanOrEqualTo = 'greater than or equal to',
    lessThanOrEqualTo = 'less than or equal to',
}

class Validator {
    valid: boolean = true;
    private _error?: string;

    public get error() {
        return this._error;
    }

    public set error(value: string) {
        this._error = `Validation Error: ${value}`;
    }

    constructor(public value: any) {}

    private compare = (value, operator: Operator) => {
        if (this.valid) {
            switch (operator) {
                case Operator.equalTo:
                    this.valid = this.value === value;
                    break;
                case Operator.greaterThan:
                    this.valid = this.value > value;
                    break;
                case Operator.greaterThanOrEqualTo:
                    this.valid = this.value >= value;
                    break;
                case Operator.lessThan:
                    this.valid = this.value < value;
                    break;
                case Operator.lessThanOrEqualTo:
                    this.valid = this.value <= value;
                    break;
            }
            if (!this.valid) {
                this.error = `${this.value} is not ${operator} ${value}`;
            }
        }
        return this;
    };

    //Common comparators
    equalTo = (value) => this.compare(value, Operator.equalTo);
    greaterThan = (value) => this.compare(value, Operator.greaterThan);
    qreaterThanOrEqualTo = (value) => this.compare(value, Operator.greaterThanOrEqualTo);
    lessThan = (value) => this.compare(value, Operator.lessThan);
    lessThanOrEqualTo = (value) => this.compare(value, Operator.lessThanOrEqualTo);

    isNotNullOrUndefined = () => {
        if (this.valid) {
            if (this.value === null) {
                this.error = 'Value is null.';
                this.valid = false;
            } else if (this.value === undefined) {
                this.error = 'Value is undefined.';
                this.valid = false;
            }
        }
        return this;
    };

    matches = (value: string | RegExp) => {
        if (this.valid) {
            if (typeof this.value !== 'string') throw `${this.value} is not a string.`;
            let res = (this.value as string).match(value);
            if (!res) {
                this.valid = false;
                this.error = `${this.value} does not contain a match for ${value.toString()}.`;
            }
        }
        return this;
    };
}

export default Validator;

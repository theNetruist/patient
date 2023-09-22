import { State } from '../services/stateService';

export default interface Address {
    street: string;
    street2?: string;
    unit?: string;
    city: string;
    state: State;
    zip: string;
}

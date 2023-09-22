import Address from '../validators/address';
import PersonalData from '../models/personalData';

export default interface UserDataService {
    updatePersonalData(data: PersonalData): void;
    getPersonalData(): PersonalData;

    updateAddress(data: Address): void;
    getAddress(): Address;
}

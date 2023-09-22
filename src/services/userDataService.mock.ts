import { injectable } from 'inversify';
import Address from '../validators/address';
import Pronouns from '../models/enums/pronouns';
import Sex from '../models/enums/sex';
import PersonalData from '../models/personalData';
import { State } from './stateService';
import UserDataService from './userDataService.interface';

@injectable()
export default class UserDataServiceMock implements UserDataService {
    private static personalData: PersonalData = {
        firstName: 'Bob',
        lastName: 'Dylan',
        dateOfBirth: new Date('01/02/34'),
        legalSex: Sex.male,
        pronouns: Pronouns.male,
        height: { feet: 6, inches: 2 },
        weight: 250,
    };

    private static address: Address = {
        street: '123 Abbey Rd',
        city: 'Oklahoma City',
        state: State.OK,
        zip: '73127',
    };

    updatePersonalData = (data: PersonalData): void => {
        UserDataServiceMock.personalData = data;
    };
    getPersonalData = (): PersonalData => UserDataServiceMock.personalData;

    updateAddress = (data: Address): void => {
        UserDataServiceMock.address = data;
    };
    getAddress = (): Address => UserDataServiceMock.address;
}

import Pronouns from './enums/pronouns';
import Sex from './enums/sex';
import Height from './HeightModel';

export default interface PersonalData {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    legalSex: Sex;
    pronouns: Pronouns;
    height: Height;
    weight: number;
}

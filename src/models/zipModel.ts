import { State } from '../services/stateService';

export default interface ZipModel {
    coty_name: string[];
    county_weights: string;
    cty_code: string[];
    density: number;
    geo_point_2d: { lon: number; lat: number };
    imprecise: 'TRUE' | 'FALSE';
    military: 'TRUE' | 'FALSE';
    population: number;
    primary_coty_code: string;
    primary_coty_name: string;
    ste_name: string;
    stusps_code: State;
    timezone: string;
    usps_city: string;
    zcta: string;
    zip_code: string;
}

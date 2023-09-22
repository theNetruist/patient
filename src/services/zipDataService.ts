import { injectable } from 'inversify';
import ZipModel from '../models/zipModel';

@injectable()
export default class ZipDataService {
    isLoaded = false;
    private data: ZipModel[];

    constructor() {
        import('../../georef-united-states-of-america-zc-point.json').then((zipData) => {
            this.data = Object.values(zipData) as unknown as ZipModel[];
            this.isLoaded = true;
        });
    }

    getZipData = (zip: string, cityCode?: string) => {
        if (!this.isLoaded) throw 'Zip Data is not yet loaded.';
        let data = this.data.filter((z) => z.zip_code?.startsWith(zip));
        if (cityCode) {
            data = data.filter((z) => z.cty_code.includes(cityCode));
        }
        return data;
    };
}

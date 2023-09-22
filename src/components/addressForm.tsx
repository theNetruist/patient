import { Card, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useInjection } from 'inversify-react';
import React, { FC, useEffect, useState } from 'react';
import { State } from '../services/stateService';
import ZipDataService from '../services/zipDataService';
import Address from '../models/address';

interface Props {
    onChange?(address: Address): void;
    address?: Address;
}

const AddressForm: FC<Props> = (props: Props) => {
    const zipService: ZipDataService = useInjection(ZipDataService);
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [unit, setUnit] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState<State>();
    const [zip, setZip] = useState('');

    const loadZip = (e) => {
        let zipCode = e.target.value;
        if (zipService.isLoaded) {
            let zipData = zipService.getZipData(zipCode);
            if (zipData.length === 1) {
                setCity(zipData[0].usps_city);
                setState(zipData[0].stusps_code);
            }
        } else {
            throw 'Zip Data is not yet loaded.';
        }
        setZip(zipCode);
    };

    const onDataChange = () => {
        props.onChange &&
            props.onChange({
                street: streetAddress,
                street2: streetAddress2,
                unit: unit,
                city: city,
                state: state,
                zip: zip,
            });
    };

    useEffect(() => {
        onDataChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streetAddress, streetAddress2, unit, city, state, zip]);

    return (
        <Card elevation={15} sx={{ padding: '20px' }}>
            <Typography variant="h3" color="primary">
                Where do you live?
            </Typography>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        label="Street Address"
                        variant="standard"
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Street Address (Line 2)"
                        variant="standard"
                        onChange={(e) => setStreetAddress2(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Unit"
                        variant="standard"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField sx={{ width: '100%' }} required label="Zip Code" variant="standard" onChange={loadZip} />
                </Grid>
                <Grid item xs={8} md={4}>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        label="City"
                        variant="standard"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="statesLabel">State</InputLabel>
                        <Select
                            labelId="statesLabel"
                            value={state || ''}
                            label="State"
                            onChange={(e) => setState(e.target.value as State)}
                        >
                            <MenuItem value=""></MenuItem>
                            {Object.getOwnPropertyNames(State).map((s) => (
                                <MenuItem value={s} key={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AddressForm;

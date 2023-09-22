import { Checkbox, FormControl, FormControlLabel, InputAdornment } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import React, { FC, useEffect, useState } from 'react';
import Pronouns from '../models/enums/pronouns';
import Sex from '../models/enums/sex';
import Height from '../models/HeightModel';
import PersonalData from '../models/personalData';
import { useInjection } from 'inversify-react';
import AuthService from '../services/authService.interface';
import DIContainer from '../diContainer';
import UserDataService from '../services/userDataService.interface';

interface Props {
    onChange?(personalData: PersonalData): void;
}

const PersonalDataForm: FC<Props> = (props: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>();
    const [legalSex, setLegalSex] = useState<Sex>();
    const [pronouns, setPronouns] = useState<Pronouns>();
    const [weight, setWeight] = useState<number>();
    const [height, setHeight] = useState<Height>({ feet: 0, inches: 0 });
    const [hasPronouns, setHasPronouns] = useState(false);
    const authService: AuthService = useInjection(DIContainer.types.AuthService);
    const userService: UserDataService = useInjection(DIContainer.types.UserDataService);

    const setFeet = (feet: number) => {
        setHeight({ feet: feet, inches: height.inches });
        onDataChange();
    };

    const setInches = (inches: number) => {
        setHeight({ feet: height.feet, inches: inches });
        onDataChange();
    };

    const sexOnKeyUp = (e) => {
        switch (e.key) {
            case 'm':
            case 'M':
                setLegalSex(Sex.male);
                break;
            case 'f':
            case 'F':
                setLegalSex(Sex.female);
                break;
            default:
                break;
        }
    };

    const pronousOnKeyUp = (e) => {
        switch (e.key) {
            case 'h':
            case 'H':
            case 'm':
            case 'M':
                setPronouns(Pronouns.male);
                break;
            case 'f':
            case 'F':
            case 's':
            case 'S':
                setPronouns(Pronouns.female);
                break;
            case 't':
            case 'T':
            case 'n':
            case 'N':
                setPronouns(Pronouns.nonBinary);
                break;
            default:
                break;
        }
    };

    const onDataChange = () => {
        props.onChange &&
            props.onChange({
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                legalSex: legalSex,
                pronouns: pronouns,
                height: height,
                weight: weight,
            });
    };

    useEffect(() => {
        onDataChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastName, firstName, dateOfBirth, legalSex, pronouns, weight, height]);

    useEffect(() => {
        if (authService.isLoggedIn) {
            let userData = userService.getPersonalData();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setDateOfBirth(userData.dateOfBirth);
            setLegalSex(userData.legalSex);
            setHasPronouns(!!userData.pronouns);
            setPronouns(userData.pronouns);
            setHeight(userData.height);
            setWeight(userData.weight);
        }
    }, []);

    return (
        <Card elevation={15} sx={{ padding: '20px' }}>
            <Typography variant="h3" color="primary">
                Who are you?
            </Typography>
            <Grid container alignItems="top" justifyContent="center" spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        label="First Name"
                        variant="standard"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName || ''}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        label="Last Name"
                        variant="standard"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName || ''}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="MM/DD/YYYY"
                            value={dateOfBirth ?? null}
                            onChange={(e: Moment) => e.isValid() && setDateOfBirth(e.toDate())}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={hasPronouns ? 3 : 4} xs={12}>
                    <FormControl fullWidth variant="standard" onKeyUp={sexOnKeyUp}>
                        <InputLabel id="legalSexLabel">Legal Sex</InputLabel>
                        <Select
                            labelId="legalSexLabel"
                            value={legalSex || ''}
                            label="Legal Sex"
                            onChange={(e) => setLegalSex(e.target.value as Sex)}
                        >
                            <MenuItem value={Sex.male}>{Sex.male}</MenuItem>
                            <MenuItem value={Sex.female}>{Sex.female}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        sx={{ marginLeft: '-20px', marginRight: '0px' }}
                        control={
                            <Checkbox
                                checked={hasPronouns}
                                onChange={(e) => {
                                    setHasPronouns(e.target.checked);
                                    if (!e.target.checked) {
                                        setPronouns(undefined);
                                    }
                                }}
                                size="small"
                            />
                        }
                        label="Specify Pronouns"
                    />
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: hasPronouns ? 'inline-flex' : 'none' }}>
                    <FormControl fullWidth variant="standard" onKeyUp={pronousOnKeyUp}>
                        <InputLabel id="pronounsLabel">Pronouns</InputLabel>
                        <Select
                            labelId="pronounsLabel"
                            value={pronouns || ''}
                            label="Pronouns"
                            onChange={(e) => setPronouns(e.target.value as Pronouns)}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value={Pronouns.male}>{Pronouns.male}</MenuItem>
                            <MenuItem value={Pronouns.female}>{Pronouns.female}</MenuItem>
                            <MenuItem value={Pronouns.nonBinary}>{Pronouns.nonBinary}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={hasPronouns ? 3 : 4} xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"> lbs</InputAdornment>,
                        }}
                        inputProps={{ max: 1400, min: 0 }}
                        label="Weight"
                        variant="standard"
                        onChange={(e) => setWeight(Number(e.target.value))}
                        value={weight || ''}
                    />
                </Grid>
                <Grid item container md={hasPronouns ? 3 : 4} xs={12}>
                    <Grid item xs={12}>
                        <InputLabel id="heightLabel">Height</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"> feet</InputAdornment>,
                            }}
                            inputProps={{ max: 10, min: 0, style: { textAlign: 'right' } }}
                            onChange={(e) => setFeet(Number(e.target.value))}
                            value={height?.feet || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"> inches</InputAdornment>,
                            }}
                            inputProps={{ max: 12, min: 0, style: { textAlign: 'right' } }}
                            onChange={(e) => setInches(Number(e.target.value))}
                            value={height?.inches || ''}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default PersonalDataForm;

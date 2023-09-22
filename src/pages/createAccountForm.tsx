import { Button, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/addressForm';
import PersonalDataForm from '../components/personalDataForm';
import UsernameForm from '../components/usernameForm';
import DIContainer from '../diContainer';
import AuthModel from '../models/authModel';
import PersonalData from '../models/personalData';
import AuthService from '../services/authService.interface';
import Address from '../models/address';
import Validator from '../validators/password.validator';
import Constants from '../models/constants';
import DemoService from '../services/demoService.interface';
import webSettings from '../websettings.json';
import theme from '../styles/defaultTheme';

export default function CreateAccountForm(props) {
    const [personalData, setPersonalData] = useState<PersonalData>();
    const [address, setAddress] = useState<Address>();
    const [authData, setAuthData] = useState<AuthModel>();
    const authService: AuthService = useInjection(DIContainer.types.AuthService);
    const demoService: DemoService = useInjection(DIContainer.types.DemoService);
    const navigate = useNavigate();

    const goHome = () => {
        if (demoService.isDemo) {
            authService.logIn({ username: webSettings.demo.username, password: webSettings.demo.password });
        } else {
            authService.logIn(authData);
        }
        navigate('/');
    };

    const isAddressValid = () => {
        let zipValidator = new Validator(address?.zip).isNotNullOrUndefined().matches(Constants.regex.zip);
        return !!address && address.street && address.city && address.state && zipValidator.valid;
    };

    const isPersonalInfoValid = () => {
        return (
            !!personalData &&
            !!personalData.firstName &&
            !!personalData.lastName &&
            !!personalData.dateOfBirth &&
            !!personalData.legalSex &&
            !!personalData.weight &&
            !!personalData.height
        );
    };

    const isAuthDataValid = () => {
        //@ts-ignore
        let isPasswordValid = new Validator(authData?.password).meetsPasswordRequirements().valid;
        return !!authData?.username && isPasswordValid;
    };

    const isFormValid = (): boolean => {
        return isAuthDataValid() && isPersonalInfoValid() && isAddressValid();
    };

    return (
        <>
            <Typography variant="h1" color="primary">
                Welcome to Salve!
            </Typography>
            <Typography variant="h2" color="secondary">
                Tell us a little about yourself...
            </Typography>
            <div className={'mt-20'} style={{ maxWidth: theme.breakpoints.values.md }}>
                <PersonalDataForm onChange={setPersonalData} />
            </div>
            <div className={'mt-20'} style={{ maxWidth: theme.breakpoints.values.md }}>
                <AddressForm onChange={setAddress} />
            </div>
            <div className={'mt-20'} style={{ maxWidth: theme.breakpoints.values.md }}>
                <UsernameForm onChange={setAuthData} />
            </div>
            <Button sx={{ marginTop: '20px' }} onClick={goHome} variant="contained" disabled={!isFormValid()}>
                Continue...
            </Button>
        </>
    );
}

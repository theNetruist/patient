import React from 'react';
import EasyCheckIn from '../pages/easyCheckIn';
import Home from '../pages/home';
import MyForms from '../pages/myForms';
import MyInfo from '../pages/myInfo';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import HouseIcon from '@mui/icons-material/House';
import ViewListIcon from '@mui/icons-material/ViewList';
import Route from '../models/routeModel';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const RouteLibrary = {
    dashboard: new Route('/', 'Dashboard', <Home />, <HouseIcon />),
    easyCheckIn: new Route('/easycheckin', 'Easy Check In', <EasyCheckIn />, <ViewListIcon />),
    myForms: new Route('/myforms', 'My Forms', <MyForms />, <DomainVerificationIcon />),
    myInfo: new Route('/myinfo', 'My Info', <MyInfo />, <PermIdentityIcon />),
};

export default RouteLibrary;

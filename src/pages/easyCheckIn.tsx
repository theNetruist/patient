import React from 'react';
import Menu from '../components/menu';
import RouteLibrary from '../components/routeLibrary';

const EasyCheckIn: React.FC = (props) => {
    return (
        <>
            <Menu path={RouteLibrary.easyCheckIn.path} /> Easy Check In!
        </>
    );
};

export default EasyCheckIn;

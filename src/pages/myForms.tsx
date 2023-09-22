import React from 'react';
import Menu from '../components/menu';
import RouteLibrary from '../components/routeLibrary';

const MyForms: React.FC = (props) => {
    return (
        <>
            <Menu path={RouteLibrary.myForms.path} /> My Forms!
        </>
    );
};

export default MyForms;

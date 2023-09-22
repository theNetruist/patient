import React from 'react';
import Menu from '../components/menu';
import RouteLibrary from '../components/routeLibrary';

const Home: React.FC = (props) => {
    return (
        <>
            <Menu path={RouteLibrary.dashboard.path} /> Home!
        </>
    );
};

export default Home;

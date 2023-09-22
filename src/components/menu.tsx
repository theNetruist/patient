/* eslint-disable @next/next/no-img-element */
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DrawerHeader from '../components/drawerHeader';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useInjection } from 'inversify-react';
import DIContainer from '../diContainer';
//@ts-ignore
import logo from '../images/Logo1.png';
import AuthService from '../services/authService.interface';
import RouteLibrary from './routeLibrary';

interface Props {
    path: string;
}

export default function Menu(props: Props) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const authService: AuthService = useInjection(DIContainer.types.AuthService);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="logo" height="80px" />
                    </Typography>
                    {/* <Button color="inherit">My Account</Button> */}
                    <div></div>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box role="presentation">
                    <List>
                        {Object.getOwnPropertyNames(RouteLibrary).map((id) => (
                            <ListItem key={RouteLibrary[id].label} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(RouteLibrary[id].path)}
                                    disabled={props.path === RouteLibrary[id].path}
                                >
                                    <ListItemIcon>{RouteLibrary[id].icon}</ListItemIcon>
                                    <ListItemText primary={RouteLibrary[id].label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <ListItem disablePadding sx={{ bottom: 0, position: 'fixed' }}>
                            <ListItemButton
                                onClick={() => {
                                    authService.logOut();
                                    navigate('/login');
                                }}
                            >
                                <ListItemIcon>
                                    <MeetingRoomIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

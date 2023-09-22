/* eslint-disable @next/next/no-img-element */
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Collapse,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import AddressForm from '../components/addressForm';
import Menu from '../components/menu';
import PersonalDataForm from '../components/personalDataForm';
import RouteLibrary from '../components/routeLibrary';
import UsernameForm from '../components/usernameForm';
import mainStyles from '../styles/default.module.css';
import theme from '../styles/defaultTheme';

interface listItemModel {
    label: string;
    icon: JSX.Element;
    component: JSX.Element;
}

class InfoListItem implements listItemModel {
    constructor(public label: string, public icon: JSX.Element, public component: JSX.Element) {}
}

export default function MyInfo(props) {
    const listItems = {
        personal: new InfoListItem('Identity', <MedicalInformationIcon />, <PersonalDataForm />),
        address: new InfoListItem('Address', <BusinessIcon />, <AddressForm />),
        account: new InfoListItem('Account', <AdminPanelSettingsIcon />, <UsernameForm />),
    };

    const [current, setCurrent] = useState(listItems.personal.label);
    const [menuOpen, setMenuOpen] = useState(false);

    function InfoMenu(props) {
        return (
            <div className={mainStyles.centered}>
                <Paper elevation={3} sx={{ width: '100%' }}>
                    <List>
                        {Object.getOwnPropertyNames(listItems).map((id) => (
                            <ListItem key={listItems[id].label} disablePadding>
                                <ListItemButton
                                    disabled={current === listItems[id].label}
                                    onClick={() => {
                                        setCurrent(listItems[id].label);
                                        setMenuOpen(false);
                                    }}
                                >
                                    <ListItemIcon>{listItems[id].icon}</ListItemIcon>
                                    <ListItemText primary={listItems[id].label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </div>
        );
    }

    return (
        <>
            <Menu path={RouteLibrary.myInfo.path} />
            <Grid
                container
                sx={{ width: { lg: theme.breakpoints.values.lg, xs: '98%' }, margin: 'auto' }}
                spacing={{ xs: 0, md: 3 }}
            >
                <Grid item xs={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <InfoMenu />
                </Grid>
                <Grid item xs={12} md={9}>
                    <AppBar position="relative" sx={{ mt: '100px', display: { md: 'none' } }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Collapse in={menuOpen}>
                        <InfoMenu />
                    </Collapse>
                    {Object.getOwnPropertyNames(listItems).map((id) => (
                        <>
                            <Collapse in={current === listItems[id].label}>{listItems[id].component}</Collapse>
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}

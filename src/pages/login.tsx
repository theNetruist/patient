import { Button, Card, CardActions, CardContent, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenReaderConditional from '../components/screenReaderConditional';
import DIContainer from '../diContainer';
import AuthService from '../services/authService.interface';
import DemoService from '../services/demoService.interface';
import styles from '../styles/login.module.css';
import mainStyles from '../styles/default.module.css';
import webSettings from '../websettings.json';

const Login: React.FC = (props: { history: any }) => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const authService: AuthService = useInjection(DIContainer.types.AuthService);
    const demoService: DemoService = useInjection(DIContainer.types.DemoService);
    const navigate = useNavigate();
    const theme = useTheme();

    const login = () => {
        let res = authService.logIn({ username: username, password: password });
        if (res.success) {
            navigate('/');
        }
    };

    const createUser = (form: boolean) => {
        if (form) {
            navigate('/newUserForm');
        } else {
            navigate('/newUser');
        }
    };

    return (
        <>
            <div className={mainStyles.centered}>
                <Card elevation={15}>
                    <CardContent>
                        <Typography variant="h1" color="primary">
                            Welcome to Salve!
                        </Typography>
                        <div>
                            <TextField
                                inputProps={{
                                    'aria-label': demoService.isDemo
                                        ? 'Username. The demo username is user.'
                                        : 'Username',
                                }}
                                color="primary"
                                className={styles.marginTop20}
                                required
                                label="Username"
                                variant="standard"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                inputProps={{
                                    'aria-label': demoService.isDemo
                                        ? 'Password. The demo password is capital P as in papa. At Symbol. Lowercase S as in sierra. S as in sierra. W as in whiskey. The number zero. Lowercase R as in Romeo. D as in Delta.'
                                        : 'Password',
                                }}
                                color="primary"
                                className={styles.marginTop20}
                                required
                                label="Password"
                                variant="standard"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={login} color="primary" variant="contained">
                            Login
                        </Button>
                        <Button onClick={() => createUser(false)} color="primary" variant="outlined">
                            New Account
                        </Button>
                    </CardActions>
                </Card>
            </div>
            {demoService.isDemo && (
                <div className={styles.demoBox}>
                    <Paper
                        // variant="outlined"
                        elevation={3}
                        sx={{
                            maxWidth: 'fit-content',
                            marginTop: '20px',
                            padding: '0 20px',
                            color: theme.palette.primary.dark,
                        }}
                    >
                        <Typography variant="caption">
                            Demo Username: {webSettings.demo.username}
                            <br />
                            Demo Password: {webSettings.demo.password}
                        </Typography>
                    </Paper>
                </div>
            )}
        </>
    );
};

export default Login;

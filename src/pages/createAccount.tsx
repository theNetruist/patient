import { Button, Card, CardContent, Collapse, Fade, Link, TextField, Typography } from '@mui/material';
import { useInjection } from 'inversify-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCapture from '../components/imageCapture';
import ScreenReaderConditional from '../components/screenReaderConditional';
import DIContainer from '../diContainer';
import AuthService from '../services/authService.interface';
import styles from '../styles/login.module.css';

export default function CreateAccount(props) {
    const navigate = useNavigate();
    const [animationStage, setAnimationStage] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService: AuthService = useInjection(DIContainer.types.AuthService);

    setTimeout(() => {
        if (animationStage < 1) {
            setAnimationStage(1);
        }
    }, 4000);

    const onCapture = (b64) => {
        console.log('Pic taken!');
        setAnimationStage(animationStage + 1);
    };

    const getPhotoText = () => {
        switch (animationStage) {
            case 1:
                return "Center your ID card in the camera, and we'll fill out your forms for you!";
            case 2:
                return 'Awesome! Now we need to see your medical Id...';
            case 3:
                return "Thanks! Now all we need is a credit card for your copay (you won't be charged yet).";
        }
    };

    const goHome = () => {
        authService.logIn({ username, password });
        setAnimationStage(6);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <>
            <ScreenReaderConditional hidden>
                <Link tabIndex={-1} href="/newUserForm">
                    I would rather type my information
                </Link>
            </ScreenReaderConditional>
            <div>
                <Fade in={animationStage < 6} timeout={{ enter: 2000, exit: 2000 }}>
                    <Typography variant="h1" color="primary">
                        Welcome to Salve!
                    </Typography>
                </Fade>
            </div>
            <Fade in={animationStage < 4}>
                <div>
                    <div>
                        <Fade in={true} timeout={{ enter: 2000 }} style={{ transitionDelay: '1000ms' }}>
                            <Typography variant="body1">It&apos;s nice to meet you!</Typography>
                        </Fade>
                    </div>
                    <div>
                        <Fade in={true} timeout={{ enter: 2000 }} style={{ transitionDelay: '2000ms' }}>
                            <Typography variant="body1">Tell us a bit about yourself...</Typography>
                        </Fade>
                    </div>
                </div>
            </Fade>
            <br />
            <div>
                <Collapse in={animationStage >= 1 && animationStage <= 3} timeout={{ enter: 2000, exit: 2000 }}>
                    <div style={{ maxWidth: '80%', width: 470, height: 495, backgroundColor: '#fff', margin: 'auto' }}>
                        {animationStage >= 1 && animationStage <= 3 && (
                            <>
                                <ImageCapture portrait={false} onSnap={onCapture} text={getPhotoText()} />
                                <Link href="/newUserForm">I would rather type my information...</Link>
                            </>
                        )}
                    </div>
                </Collapse>
                <Collapse in={animationStage === 4} timeout={{ enter: 2000, exit: 2000 }}>
                    <Card elevation={15}>
                        <CardContent>
                            <Typography variant="h2" component="div">
                                Type in a new username and password.
                            </Typography>
                            <div>
                                <TextField
                                    className={styles.marginTop20}
                                    required
                                    label="Create Username"
                                    variant="standard"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={styles.marginTop20}
                                    required
                                    label="Create Password"
                                    variant="standard"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button onClick={() => setAnimationStage(5)}>Continue</Button>
                        </CardContent>
                    </Card>
                </Collapse>
                <Fade in={animationStage === 5} timeout={{ enter: 2000, exit: 2000 }}>
                    <div>
                        <Typography>
                            Thanks! You&apos;re all set up! Now let&apos;s take you to your Home Page!
                        </Typography>
                        <Button onClick={goHome}>Continue...</Button>
                    </div>
                </Fade>
            </div>
        </>
    );
}

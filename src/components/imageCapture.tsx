import { Button, CardActions, Fade } from '@mui/material';
import { Container, Link, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Paper } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Webcam from 'react-webcam';

interface Props {
    portrait?: boolean;
    width?: number;
    height?: number;
    onSnap(b64String: string): void;
    text?: string;
}

const ImageCapture: React.FC<Props> = (props: Props) => {
    const webcamRef = React.useRef(null);
    const [cameraId, setCameraId] = useState(0);
    const [cameraList, setCameraList] = useState([]);

    const flashTime = 300;
    const [flashIn, setFlashIn] = useState(true);

    useEffect(() => {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => devices.filter(({ kind }) => kind === 'videoinput').map((camera) => camera.deviceId))
            .then((list) => {
                setCameraList(list);
            });
    }, []);

    const switchCamera = () => {
        let cameraListIndex = cameraId + 1;
        if (cameraListIndex >= cameraList.length) {
            cameraListIndex = 0;
        }
        setCameraId(cameraListIndex);
    };

    const capture = () => {
        flash();
        props.onSnap(webcamRef.current.getScreenshot());
    };

    const flash = () => {
        setFlashIn(false);
        setTimeout(() => {
            setFlashIn(true);
        }, flashTime);
    };

    return (
        <>
            <Fade in={flashIn} timeout={{ enter: flashTime, exit: flashTime }}>
                <Card elevation={12}>
                    <CardContent>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            height={400}
                            width={'100%'}
                            videoConstraints={{ width: 400, height: 400, deviceId: cameraList[cameraId] }}
                            style={{ maxWidth: '100%' }}
                        />
                        <Typography variant="h3" sx={{ fontFamily: 'cursive' }}>
                            {props.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Fade>
            <Container>
                <Button variant="contained" onClick={capture} sx={{ margin: '10px' }}>
                    Capture
                </Button>
                <Button variant="contained" onClick={switchCamera} sx={{ margin: '10px' }}>
                    Switch Camera
                </Button>
            </Container>
        </>
    );
};
export default ImageCapture;

import { Card, CardContent, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AuthModel from '../models/authModel';

interface Props {
    onChange?(authModel: AuthModel): void;
}

export default function UsernameForm(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        onChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password]);

    const onChange = () => {
        props.onChange && props.onChange({ username, password });
    };

    return (
        <Card elevation={15} sx={{ padding: '20px' }}>
            <Typography variant="h3" color="primary">
                Type in a new username and password.
            </Typography>
            <div>
                <TextField
                    required
                    label="Create Username"
                    variant="standard"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    sx={{ marginTop: '20px' }}
                    value={username}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Create Password"
                    variant="standard"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                />
            </div>
        </Card>
    );
}

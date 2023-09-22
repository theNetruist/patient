import { Card, CardContent, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import styles from "../styles/default.module.css";

const DemoNotice: React.FC = (props) => {
    const theme = useTheme();

    return (
        <Paper
            className={styles.textCenter}
            elevation={3}
            sx={{
                maxWidth: "fit-content",
                margin: "20px 0",
                padding: "0 20px",
                color: theme.palette.primary.dark,
            }}
        >
            <Typography variant="caption">
                This is a Demo of Salve.
                <br />
                Information entered here will not be saved, and any information
                presented is made up for demo purposes only.
            </Typography>
        </Paper>
    );
};

export default DemoNotice;

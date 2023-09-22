import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: { fontSize: '2em' },
        h2: { fontSize: '1.5em' },
        h3: { fontSize: '1.3em' },
        h4: { fontSize: '1em' },
        h5: { fontSize: '0.8em' },
        h6: { fontSize: '0.7em' },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            light: '#c3fdff',
            dark: '#0c2231',
            main: '#0f4880',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#a7c0cd',
            dark: '#4b636e',
            main: '#78909c',
            contrastText: '#000000',
        },
    },
});

export default theme;

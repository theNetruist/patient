import 'reflect-metadata';
import { Provider } from 'inversify-react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import DIContainer from './diContainer';
import styles from './styles/default.module.css';
import { ThemeProvider } from '@mui/material';
import theme from './styles/defaultTheme';
import Footer from './components/footer';

const App: React.FC = (props) => {
    const container = new DIContainer().container;

    return (
        <>
            <Provider container={container}>
                <ThemeProvider theme={theme}>
                    <main>
                        <div id="content" className={styles.textCenter}>
                            <Router />
                        </div>
                    </main>
                    <Footer />
                </ThemeProvider>
            </Provider>
        </>
    );
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;

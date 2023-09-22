import { Divider } from '@mui/material';
import { useInjection } from 'inversify-react';
import React, { useEffect, useState } from 'react';
import DIContainer from '../diContainer';
import DemoService from '../services/demoService.interface';
import DemoNotice from './demoNotice';

const Footer: React.FC = (props) => {
    const demoService: DemoService = useInjection(DIContainer.types.DemoService);

    const [hasFixedFooter, setHasFixedFooter] = useState(true);

    // let resizer = () => {
    //     let footerHeight = document.querySelector('footer')?.offsetHeight ?? 0;

    //     let contentHeight = document.getElementById('content').offsetHeight;
    //     let top = document.getElementById('content').offsetTop;
    //     let usedSpace = top + contentHeight + footerHeight + 20;
    //     let availableContentSpace = window.innerHeight;
    //     let needsFixedFooter = availableContentSpace > usedSpace;

    //     if (needsFixedFooter) {
    //         setHasFixedFooter(true);
    //     } else {
    //         setHasFixedFooter(false);
    //     }
    // };

    // useEffect(() => {
    //     setInterval(resizer, 1000);
    //     resizer();
    // }, []);

    return (
        <footer
            style={
                {
                    //position: hasFixedFooter ? 'fixed' : 'relative',
                }
            }
        >
            {demoService.isDemo && <DemoNotice />}
            <Divider flexItem={true} />
            <a href="/" target="_blank" rel="noopener noreferrer">
                Salve (säv)
            </a>
        </footer>
    );
};

export default Footer;

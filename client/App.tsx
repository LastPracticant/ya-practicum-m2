import './App.css';
import './shared/styles/theme.css';

import React, { useEffect } from 'react';
import { Routing } from 'client/routing/Routing';
import { CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, snackbarSelector } from './core/store/selectors';
import { ColorThemeContextProvider } from './core/context';

export const App: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');

        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <ColorThemeContextProvider>
            <CssBaseline />
            <NivelatorXY>
                <Routing />
                <Loader isVisible={loader.isVisible} />
                <SnackBar open={snackBar.isVisible} {...snackBar} />
            </NivelatorXY>
        </ColorThemeContextProvider>
    );
};

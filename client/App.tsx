import './App.css';
import './shared/styles/theme.css';

import React, { useEffect, useMemo } from 'react';
import { Routing } from 'client/routing/Routing';
import {
    createMuiTheme, CssBaseline, NoSsr, ThemeProvider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, settingsSelector, snackbarSelector } from './core/store/selectors';
import { DARK_THEME, LIGHT_THEME } from './core/colors';
import { GameSoundTheme } from './core/components';

export const App: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);
    const userSettings = useSelector(settingsSelector);

    const themeSettings = useMemo(() => createMuiTheme({
        palette: userSettings.isColorThemeLight ? LIGHT_THEME : DARK_THEME,
    }), [userSettings]);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');

        jssStyles?.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <ThemeProvider theme={themeSettings}>
            <CssBaseline />
            <NivelatorXY>
                <Routing />
                <Loader isVisible={loader.isVisible} />
                <SnackBar open={snackBar.isVisible} {...snackBar} />
            </NivelatorXY>

            <NoSsr>
                <GameSoundTheme />
            </NoSsr>
        </ThemeProvider>
    );
};

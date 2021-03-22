import './App.css';
import './shared/styles/theme.css';

import React from 'react';
import { Routing } from 'client/routing/Routing';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, snackbarSelector } from './core/store/selectors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: red[50],
            main: red[500],
            dark: red[700],
        },
    },
});

const AppContainer: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NivelatorXY>
                    <Routing />
                    <Loader isVisible={loader.isVisible} />
                    <SnackBar open={snackBar.isVisible} {...snackBar} />
                </NivelatorXY>
            </ThemeProvider>
    );
};

export const App = hot(AppContainer);

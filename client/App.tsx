import './App.css';
import bem from 'bem-cn';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from 'client/routing/Routing';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import './shared/styles/theme.css';
import { useSelector } from 'react-redux';
import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, snackbarSelector } from './core/store/selectors';

const block = bem('home');
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

export const App: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NivelatorXY className={block()}>
                <BrowserRouter>
                    <Routing />
                    <Loader isVisible={loader.isVisible} />
                    <SnackBar open={snackBar.isVisible} {...snackBar} />
                </BrowserRouter>
            </NivelatorXY>
        </ThemeProvider>
    );
};

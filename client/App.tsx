import './App.css';
import './shared/styles/theme.css';

import React, { useCallback, useMemo, useState } from 'react';
import { Routing } from 'client/routing/Routing';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, FormControlLabel, Switch } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loader, SnackBar, NivelatorXY } from './shared/components';
import { loaderSelector, snackbarSelector } from './core/store/selectors';
import { LOCAL } from './shared/consts';
import { DARK_THEME, LIGHT_THEME } from './core/colors';

export const App: React.FC = () => {
    const loader = useSelector(loaderSelector);
    const snackBar = useSelector(snackbarSelector);
    const [isDarkTheme, setDarkTheme] = useState(true);

    const theme = useMemo(() => createMuiTheme({
        palette: isDarkTheme ? DARK_THEME : LIGHT_THEME,
    }), [isDarkTheme]);

    const handleThemeChange = useCallback(() => {
        setDarkTheme((prevState) => !prevState);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NivelatorXY>
                <FormControlLabel
                    control={(
                            <Switch
                                checked={isDarkTheme}
                                onChange={handleThemeChange}
                                name="isColorThemeDark"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        )}
                    label={LOCAL.SETTINGS_THEME}
                    style={{
                        position: 'fixed',
                        zIndex: 1000,
                        top: 0,
                        right: 0,
                        background: '#dedede',
                        padding: '0 10px 0 0',
                        margin: 0,
                    }}
                />
                <Routing />
                <Loader isVisible={loader.isVisible} />
                <SnackBar open={snackBar.isVisible} {...snackBar} />
            </NivelatorXY>
        </ThemeProvider>
    );
};

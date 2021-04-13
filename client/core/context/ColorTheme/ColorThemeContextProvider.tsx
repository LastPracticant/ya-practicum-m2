import React, {
    FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { DARK_THEME, LIGHT_THEME } from 'client/core/colors';
import { isServer } from 'client/core/store';
import { ColorThemeContext } from './ColorTheme.context';
import { ColorThemes } from './ColorTheme.types';
import { isThemeColorDark, isThemeColorLight } from './ColorTheme.utils';

const storageKey = 'color-theme';

export const ColorThemeContextProvider: FC = React.memo(({ children }) => {
    const colorThemeFromStorage = !isServer ? localStorage.getItem(storageKey) as ColorThemes : undefined;
    const [theme, updateTheme] = useState<ColorThemes>(
        colorThemeFromStorage || ColorThemes.Dark,
    );

    const themeSettings = useMemo(() => createMuiTheme({
        palette: isThemeColorDark(theme) ? DARK_THEME : LIGHT_THEME,
    }), [theme]);

    const changeTheme = useCallback(
        () => updateTheme((prevTheme) => (isThemeColorLight(prevTheme) ? ColorThemes.Dark : ColorThemes.Light)),
        [updateTheme],
    );

    useEffect(() => {
        if (!isServer) localStorage.setItem(storageKey, theme);
    }, [theme]);

    return (
        <ColorThemeContext.Provider value={{ theme, changeTheme, updateTheme }}>
            <ThemeProvider theme={themeSettings}>
                {children}
            </ThemeProvider>
        </ColorThemeContext.Provider>
    );
});

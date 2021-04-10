import React from 'react';

import { ColorThemeContextProps, ColorThemes } from './ColorTheme.types';

export const ColorThemeContext = React.createContext<ColorThemeContextProps>({
    theme: ColorThemes.Dark,
    changeTheme: () => {},
    updateTheme: () => {},
});

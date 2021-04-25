import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { ColorThemes } from 'client/pages/Settings/Settings.config';

export const DARK_THEME: PaletteOptions = {
    type: ColorThemes.Dark,
    primary: {
        main: '#fff',
    },
};

export const LIGHT_THEME: PaletteOptions = {
    type: ColorThemes.Light,
    primary: {
        main: '#000',
    },
};

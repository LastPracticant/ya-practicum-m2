import { ColorThemes } from './ColorTheme.types';

export const isThemeColorLight = (themeColor: ColorThemes) => themeColor === ColorThemes.Light;
export const isThemeColorDark = (themeColor: ColorThemes) => themeColor === ColorThemes.Dark;

import { FnActionProps, FnActionRequiredProps } from 'client/shared/types';

export enum ColorThemes {
    Light = 'light',
    Dark = 'dark',
}

export interface ColorThemeContextProps {
    theme: ColorThemes
    changeTheme: FnActionProps
    updateTheme: FnActionRequiredProps<ColorThemes>
}

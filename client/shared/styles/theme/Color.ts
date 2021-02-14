enum Color {
    'primary',
    'default',
    'dark',
    'light',
    'contrastText',
    'error',
}

type ColorProps = keyof typeof Color;

type TColors = Record<keyof typeof Color, string>;

const colors: TColors = {
    primary: '#f50057',
    light: '#ff4081',
    dark: '#c51162',
    contrastText: '#fff',
    default: 'rgb(204, 204, 204)',
    error: 'red',
};

export { colors, TColors, ColorProps };

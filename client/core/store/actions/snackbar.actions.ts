import { SnackBarDataProps } from 'client/shared/components';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const showSnackBarAction = (payload: SnackBarDataProps) => ({
    type: SHOW_SNACKBAR,
    payload,
});

export const hideSnackBarAction = () => ({
    type: HIDE_SNACKBAR,
});

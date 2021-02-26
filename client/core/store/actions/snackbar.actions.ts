import { SnackBarDataProps } from 'client/shared/components';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { StoreProps } from '../store.types';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

const showSnackBarAction = (payload: SnackBarDataProps) => ({
    type: SHOW_SNACKBAR,
    payload,
});

const hideSnackBarAction = () => ({
    type: HIDE_SNACKBAR,
});

export const visibleSnackBar = (
    payload: SnackBarDataProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    dispatch(showSnackBarAction(payload));

    setTimeout(() => dispatch(hideSnackBarAction()), 5000);
};

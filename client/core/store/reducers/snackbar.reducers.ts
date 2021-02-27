import { ActionProps } from '../actions/actions.types';
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions';
import { StoreSnackBarProps } from '../store.types';

export const initialStateSnackBar: StoreSnackBarProps = {
    isVisible: false,
    msg: '',
    type: 'info',
};

export const snackbarReducers = (state = initialStateSnackBar, action: ActionProps) => {
    switch (action.type) {
    case SHOW_SNACKBAR: {
        return { ...state, ...action.payload, isVisible: true };
    }
    case HIDE_SNACKBAR: {
        return { ...state, isVisible: false };
    }
    default:
        return state;
    }
};

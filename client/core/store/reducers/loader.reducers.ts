import { ActionProps } from '../actions/actions.types';
import { HIDE_LOADER, SHOW_LOADER } from '../actions/loader.actions';

const initialState = false;

export const loaderReducers = (state: boolean = initialState, action: ActionProps<boolean>) => {
    switch (action.type) {
    case SHOW_LOADER: {
        return true;
    }
    case HIDE_LOADER: {
        return false;
    }
    default:
        return state;
    }
};

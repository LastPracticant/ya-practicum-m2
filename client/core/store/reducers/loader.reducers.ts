import { ActionProps } from '../actions/actions.types';
import { HIDE_LOADER, SHOW_LOADER } from '../actions/loader.actions';

const initialState: boolean = false;

export const loaderReducers = (state = initialState, action: ActionProps) => {
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

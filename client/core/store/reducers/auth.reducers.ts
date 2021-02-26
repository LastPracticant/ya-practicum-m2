import { ActionProps } from '../actions/actions.types';
import { LOGIN, LOGOUT } from '../actions';

const initialState: boolean = false;

export const authReducers = (state = initialState, action: ActionProps) => {
    switch (action.type) {
    case LOGIN: {
        return true;
    }
    case LOGOUT: {
        return false;
    }
    default:
        return state;
    }
};

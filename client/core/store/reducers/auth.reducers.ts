import { ActionProps } from '../actions/actions.types';
import { LOGIN, LOGOUT } from '../actions';

const initialState: boolean = false;

const getInitialStateAuth = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        const serialisedAuth = Boolean(JSON.parse(auth));
        return serialisedAuth;
    }
    return initialState;
};

export const authReducers = (
    state = getInitialStateAuth(),
    action: ActionProps,
) => {
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

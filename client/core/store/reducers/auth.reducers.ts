import { ActionProps } from '../actions/actions.types';
import { SET_AUTH } from '../actions/auth.actions';

const initialState: boolean = false;

export const authReducers = (state = initialState, action: ActionProps) => {
    switch (action.type) {
    case SET_AUTH: {
        return action.payload;
    }
    default:
        return state;
    }
};

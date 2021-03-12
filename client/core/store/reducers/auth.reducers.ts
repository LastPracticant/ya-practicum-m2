import { ActionProps } from '../actions/actions.types';
import { SET_AUTH } from '../actions/auth.actions';

const initialState = null;

export const authReducers = (state: boolean | null = initialState, action: Required<ActionProps<boolean>>) => {
    switch (action.type) {
    case SET_AUTH: {
        return action.payload;
    }
    default:
        return state;
    }
};

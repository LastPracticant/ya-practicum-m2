import { ActionProps } from '../actions/actions.types';
import { SET_SERVICE_ID } from '../actions/oauth.actions';

const initialState = null;

export const oauthReducers = (state: number | null = initialState, action: Required<ActionProps<number>>) => {
    switch (action.type) {
    case SET_SERVICE_ID: {
        return action.payload;
    }
    default:
        return state;
    }
};

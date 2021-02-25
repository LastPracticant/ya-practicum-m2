import { CurrentUserInfoProps } from 'client/core/api';
import { ActionProps } from '../actions/actions.types';
import { GET_CURRENT_USER_INFO } from '../actions/profile.actions';

const initialState = null;

export const profileReducers = (
    state = initialState,
    action: ActionProps<CurrentUserInfoProps>,
) => {
    switch (action.type) {
    case GET_CURRENT_USER_INFO:
        return { ...action.payload };
    default:
        return state;
    }
};

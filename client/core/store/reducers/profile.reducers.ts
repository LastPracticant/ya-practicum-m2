import { CurrentUserInfoProps } from 'client/core/api';
import { ActionProps } from '../actions/actions.types';
import { SET_CURRENT_USER_INFO } from '../actions/auth.actions';

const initialStateProfile = {} as CurrentUserInfoProps;

export const profileReducers = (
    state: CurrentUserInfoProps = initialStateProfile,
    action: Required<ActionProps<CurrentUserInfoProps>>,
) => {
    switch (action.type) {
    case SET_CURRENT_USER_INFO:
        return { ...action.payload };
    default:
        return state;
    }
};

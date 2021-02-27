import { CurrentUserInfoProps } from 'client/core/api';
import { ActionProps } from '../actions/actions.types';
import { GET_CURRENT_USER_INFO } from '../actions/profile.actions';

export const initialStateProfile: CurrentUserInfoProps = {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
};

export const profileReducers = (
    state = initialStateProfile,
    action: ActionProps<CurrentUserInfoProps>,
) => {
    switch (action.type) {
    case GET_CURRENT_USER_INFO:
        return { ...action.payload };
    default:
        return state;
    }
};

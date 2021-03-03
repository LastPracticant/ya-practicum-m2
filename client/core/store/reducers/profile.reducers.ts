import { CurrentUserInfoProps } from 'client/core/api';
import { ActionProps } from '../actions/actions.types';
import { GET_CURRENT_USER_INFO } from '../actions/profile.actions';

const initialStateProfile: CurrentUserInfoProps = {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
};

const getInitStateProfile = () => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        const serialisedProfile = JSON.parse(profile) as CurrentUserInfoProps;
        return serialisedProfile;
    }
    return initialStateProfile;
};

export const profileReducers = (
    state = getInitStateProfile(),
    action: ActionProps<CurrentUserInfoProps>,
) => {
    switch (action.type) {
    case GET_CURRENT_USER_INFO:
        return { ...action.payload };
    default:
        return state;
    }
};

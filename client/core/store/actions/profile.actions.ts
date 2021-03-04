import {
    ProfileAPI,
    ChangePasswordProps,
    ChangeProfileProps,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { getCurrentUserInfoThunk } from './auth.actions';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_AVATAR = 'EDIT_AVATAR';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';

export const editProfileThunk = (
    data: ChangeProfileProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.change(data).then(() => (
        dispatch(getCurrentUserInfoThunk())
    ));
};

export const editAvatarThunk = (
    data: FormData,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.changeAvatar(data).then(() => (
        dispatch(getCurrentUserInfoThunk())
    ));
};

export const editPasswordThunk = (
    data: ChangePasswordProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.changePassword(data).then(() => (
        dispatch(getCurrentUserInfoThunk())
    ));
};

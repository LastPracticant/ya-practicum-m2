import {
    AuthAPI, ProfileAPI, ChangePasswordProps, API_HOST, ChangeProfileProps, CurrentUserInfoProps,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { showLoaderAction, hideLoaderAction } from './loader.actions';

export const GET_CURRENT_USER_INFO = 'GET_CURRENT_USER_INFO';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_AVATAR = 'EDIT_AVATAR';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';

export const getCurrentUserInfo = (payload: CurrentUserInfoProps) => (
    { type: 'GET_CURRENT_USER_INFO', payload }
);

export const thunkCurrentUserInfo = (
):ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    dispatch(showLoaderAction());
    AuthAPI.getCurrentUserInfo().then((payload) => {
        Object.assign(payload, { avatar: API_HOST + payload.avatar });
        dispatch(getCurrentUserInfo(payload));
        dispatch(hideLoaderAction());
    });
};

export const thunkEditProfile = (
    data: ChangeProfileProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.change(data).then(() => (
        dispatch(thunkCurrentUserInfo())
    ));
};

export const thunkEditAvatar = (
    data: FormData,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.changeAvatar(data).then(() => (
        dispatch(thunkCurrentUserInfo())
    ));
};

export const thunkEditPassword = (
    data: ChangePasswordProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    ProfileAPI.changePassword(data).then(() => (
        dispatch(thunkCurrentUserInfo())
    ));
};

import {
    API_HOST,
    AuthAPI,
    CurrentUserInfoProps,
    SigninProps,
    SignupProps,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';
import { showSnackBarAction } from './snackbar.actions';

function setAuth(value: boolean) {
    localStorage.setItem('isAuth', value ? '1' : '0');
}

export function checkAuth() {
    return Boolean(+(localStorage.getItem('isAuth') || 0));
}

export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';

export const setCurrentUserInfoAction = (payload: CurrentUserInfoProps) => (
    { type: SET_CURRENT_USER_INFO, payload }
);

export const getCurrentUserInfoThunk = (
):ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    dispatch(showLoaderAction());
    AuthAPI.getCurrentUserInfo().then((payload) => {
        dispatch(setCurrentUserInfoAction({
            ...payload,
            avatar: API_HOST + payload.avatar,
        }));
        setAuth(true);
    }).catch(() => {
        setAuth(false);
    }).finally(() => {
        dispatch(hideLoaderAction());
    });
};

export const signupThunk = (
    data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signup(data).finally(() => {
        dispatch(hideLoaderAction());
        dispatch(getCurrentUserInfoThunk());
    });
};

export const logoutThunk = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.logout().finally(() => {
        dispatch(hideLoaderAction());
        setAuth(false);
    });
};

export const signinThunk = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    return AuthAPI.signin(data)
        .then(() => {
            dispatch(hideLoaderAction());
            dispatch(getCurrentUserInfoThunk());
        })
        .catch((response) => {
            dispatch(hideLoaderAction());
            response.json().then((result: any) => {
                dispatch(showSnackBarAction({ type: 'error', msg: result?.reason }));
            });
        });
};

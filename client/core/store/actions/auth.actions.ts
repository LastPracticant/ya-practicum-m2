import {
    API_SERVER_HOST,
    AuthAPI,
    CurrentUserInfoProps,
    SigninProps,
    SignupProps,
} from 'client/core/api';
import { ROUTES } from 'client/routing';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';
import { showSnackBarAction } from './snackbar.actions';

export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';
export const SET_AUTH = 'SET_AUTH';

export const changeAuth = (payload: boolean) => ({ type: SET_AUTH, payload });

export const setCurrentUserInfoAction = (payload: CurrentUserInfoProps) => ({
    type: SET_CURRENT_USER_INFO,
    payload,
});

export const getCurrentUserInfoThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    AuthAPI.getCurrentUserInfo().then(async (response) => {
        dispatch(
            setCurrentUserInfoAction({
                ...response,
                avatar: response.avatar && API_SERVER_HOST + response.avatar,
            }),
        );
        dispatch(changeAuth(true));
    }).catch(() => {
        dispatch(changeAuth(false));
    });
};

export const signupThunk = (
    data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signup(data).finally(() => {
        dispatch(getCurrentUserInfoThunk());
    }).then(() => {
        dispatch(push(ROUTES.HOME.path));
    }).finally(() => {
        dispatch(hideLoaderAction());
    });
};

export const logoutThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.logout()
        .then(() => {
            dispatch(changeAuth(false));
        })
        .finally(() => {
            dispatch(hideLoaderAction());
            dispatch(push(ROUTES.SIGNIN.path));
        });
};

export const signinThunk = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signin(data)
        .then(() => {
            dispatch(getCurrentUserInfoThunk());
        })
        .then(() => {
            dispatch(push(ROUTES.HOME.path));
        })
        .catch((response) => {
            response.json().then((result: any) => {
                dispatch(
                    showSnackBarAction({ type: 'error', msg: result?.reason }),
                );
            });
        })
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

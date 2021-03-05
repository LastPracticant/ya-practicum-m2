import {
    API_HOST,
    AuthAPI,
    CurrentUserInfoProps,
    SigninProps,
    SignupProps,
} from 'client/core/api';
import { ROUTES } from 'client/routing';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';
import { showSnackBarAction } from './snackbar.actions';

export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';
export const SET_AUTH = 'SET_AUTH';

const changeAuth = (payload: boolean) => ({ type: SET_AUTH, payload });

export const setCurrentUserInfoAction = (payload: CurrentUserInfoProps) => ({
    type: SET_CURRENT_USER_INFO,
    payload,
});

export const getCurrentUserInfoThunk = (): ThunkAction<
void,
StoreProps,
unknown,
Action<string>
> => (dispatch) => {
    dispatch(showLoaderAction());
    AuthAPI.getCurrentUserInfo()
        .then((payload) => {
            dispatch(
                setCurrentUserInfoAction({
                    ...payload,
                    avatar: API_HOST + payload.avatar,
                }),
            );
            dispatch(changeAuth(true));
        })
        .catch(() => {
            dispatch(changeAuth(false));
        })
        .finally(() => {
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
        window.history.pushState({}, '', ROUTES.HOME.path);
    });
};

export const logoutThunk = (): ThunkAction<
void,
StoreProps,
unknown,
Action<string>
> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.logout()
        .then(() => {
            dispatch(changeAuth(false));
        })
        .finally(() => {
            dispatch(hideLoaderAction());
            window.history.pushState({}, '', ROUTES.SIGNIN.path);
        });
};

export const signinThunk = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signin(data)
        .then(() => {
            dispatch(hideLoaderAction());
            dispatch(getCurrentUserInfoThunk());
            window.history.pushState({}, '', ROUTES.HOME.path);
        })
        .catch((response) => {
            dispatch(hideLoaderAction());
            response.json().then((result: any) => {
                dispatch(
                    showSnackBarAction({ type: 'error', msg: result?.reason }),
                );
            });
        });
};

import { AuthAPI, SigninProps, SignupProps } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';
import { thunkCurrentUserInfo } from './profile.actions';
import { showSnackBarAction } from './snackbar.actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = () => ({ type: LOGIN });

export const logoutAction = () => ({ type: LOGOUT });

export const thunkSignup = (
    data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signup(data).finally(() => {
        dispatch(hideLoaderAction());
        dispatch(loginAction());
        dispatch(thunkCurrentUserInfo());
    });
};

export const thunkLogout = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.logout().finally(() => {
        dispatch(logoutAction());
        dispatch(hideLoaderAction());
    });
};

export const thunkSignin = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());
    AuthAPI.signin(data)
        .then(() => {
            dispatch(hideLoaderAction());
            dispatch(loginAction());
            dispatch(thunkCurrentUserInfo());
        })
        .catch((response) => {
            dispatch(hideLoaderAction());
            response.json().then((result: any) => {
                dispatch(showSnackBarAction({ type: 'error', msg: result?.reason }));
            });
        });
};

import { AuthAPI, SigninProps, SignupProps } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const thunkLogin = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    dispatch(showLoaderAction());

    AuthAPI.signin(data).finally(() => {
        dispatch(hideLoaderAction());
    });
};

export const thunkSignup = (
    data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (
    dispatch,
) => {
    dispatch(showLoaderAction());

    AuthAPI.signup(data).finally(() => {
        dispatch(hideLoaderAction());
    });
};

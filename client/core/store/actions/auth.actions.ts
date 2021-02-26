import { AuthAPI, SigninProps, SignupProps } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';
import { thunkCurrentUserInfo } from './profile.actions';
import { visibleSnackBar } from './snackbar.actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = () => ({ type: LOGIN });

export const logout = () => ({ type: LOGOUT });

export const thunkSignup = (
    data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.signup(data).finally(() => {
        dispatch(hideLoaderAction());
        dispatch(login());
        dispatch(thunkCurrentUserInfo());
    });
};

export const thunkLogout = (): ThunkAction<
void,
StoreProps,
unknown,
Action<string>
> => (dispatch) => {
    dispatch(showLoaderAction());

    AuthAPI.logout().finally(() => {
        dispatch(logout());
        dispatch(hideLoaderAction());
    });
};

export const thunkSignin = (
    data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());
    AuthAPI.signin(data).then(
        () => {
            dispatch(hideLoaderAction());
            dispatch(login());
            dispatch(thunkCurrentUserInfo());
        },
        (response) => {
            dispatch(hideLoaderAction());
            dispatch(visibleSnackBar({ type: 'error', msg: 'fdfsd' }));
            response.json().then((result: any) => {
                dispatch(visibleSnackBar({ type: 'error', msg: result?.reason }));
            });
        },
    );
};

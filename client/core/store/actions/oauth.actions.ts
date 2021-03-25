import {
    OAuthAPI,
} from 'client/core/api';
import { ROUTES } from 'client/routing';
import { push } from 'connected-react-router';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { getCurrentUserInfoThunk } from './auth.actions';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_SERVICE_ID = 'SET_SERVICE_ID';

export const setServiceIdAction = (payload: number) => ({
    type: SET_SERVICE_ID,
    payload,
});

export const getServiceIdThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    OAuthAPI.getServiceId().then((response) => {
        dispatch(setServiceIdAction(response.service_id));
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const signinWithYandexThunk = (
    code: string,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    OAuthAPI.signinWithYandex({ code })
        .then(() => {
            dispatch(getCurrentUserInfoThunk());
        })
        .then(() => {
            dispatch(push(ROUTES.HOME.path));
        })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

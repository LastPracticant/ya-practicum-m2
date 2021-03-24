import {
    OAuthAPI,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_SERVICE_ID = 'SET_SERVICE_ID';

export const setServiceIdAction = (payload: number) => ({
    type: SET_SERVICE_ID,
    payload,
});

export const signinWithYandexThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    OAuthAPI.getServiceId().then((response) => {
        dispatch(setServiceIdAction(response.service_id));
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

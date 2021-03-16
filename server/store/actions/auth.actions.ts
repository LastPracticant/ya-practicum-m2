import {
    API_SERVER_HOST,
} from 'client/core/api';
import { Request } from 'express';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ExpressAuthAPI } from 'server/api/auth.api';
import { composeCookies } from 'server/server.utils';
import { changeAuth, setCurrentUserInfoAction, StoreProps } from 'client/core/store';

export const getCurrentUserInfoThunk = (req: Request): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
    console.log('call 1');
    await ExpressAuthAPI.getCurrentUserInfo({
        headers: {
            Cookie: composeCookies(req),
        },
    }).then(async (response) => {
        const payload = await response.json();
        console.log('call 2');
        dispatch(
            setCurrentUserInfoAction({
                ...payload,
                avatar: API_SERVER_HOST + payload.avatar,
            }),
        );
        dispatch(changeAuth(true));
    })
        .catch(() => {
            console.log('call 3');
            dispatch(changeAuth(false));
        });
};

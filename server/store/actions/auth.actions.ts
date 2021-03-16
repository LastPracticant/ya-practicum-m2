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
    await ExpressAuthAPI.getCurrentUserInfo({
        headers: {
            Cookie: composeCookies(req),
        },
    }).then(async (response) => {
        const payload = await response.json();
        dispatch(
            setCurrentUserInfoAction({
                ...payload,
                avatar: API_SERVER_HOST + payload.avatar,
            }),
        );
        dispatch(changeAuth(true));
    })
        .catch(() => {
            dispatch(changeAuth(false));
        });
};

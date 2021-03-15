import {
    composeStore,
    // getCurrentUserInfoThunk,
    // StoreProps,
} from 'client/core/store';
import { NextFunction, Request, Response } from 'express';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import { defaultState } from '../initialState';
import { renderHtml } from './renderHtml';

import 'isomorphic-fetch';

export function renderBundle(req: Request, res: Response, next: NextFunction) {
    res.renderBundle = async (url: string) => {
        const store = composeStore(defaultState);
        const state = store.getState();

        // const dispatch = store.dispatch as ThunkDispatch<StoreProps, void, AnyAction>;
        // Promise.resolve().then(() => {
        //     console.log('before dispatch getCurrentUserInfoThunk');
        //     return new Promise(() => {
        //         dispatch(getCurrentUserInfoThunk());
        //     });
        // }).finally(() => {
        //     console.log('after dispatch getCurrentUserInfoThunk');
        // });

        const { html } = renderHtml(url, state, store);
        res.send(html);
    };

    next();
}

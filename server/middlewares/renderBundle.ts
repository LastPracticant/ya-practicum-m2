import {
    composeStore,
    StoreProps,
} from 'client/core/store';
import { NextFunction, Request, Response } from 'express';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetch from 'node-fetch';
import { getCurrentUserInfoThunk } from 'server/store/actions';
import { defaultState } from '../store/initialState';
import { renderHtml } from './renderHtml';

if (!globalThis.fetch) {
    // @ts-ignore
    globalThis.fetch = fetch;
}

export function renderBundle(req: Request, res: Response, next: NextFunction) {
    res.renderBundle = async (url: string) => {
        const store = composeStore(defaultState);
        const state = store.getState();

        const dispatch = store.dispatch as ThunkDispatch<StoreProps, void, AnyAction>;

        console.log('before dispatch getCurrentUserInfoThunk');

        await dispatch(getCurrentUserInfoThunk(req));

        console.log('after dispatch getCurrentUserInfoThunk');

        const { html } = renderHtml(url, state, store);
        res.send(html);
    };

    next();
}

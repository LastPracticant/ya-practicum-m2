import { Request } from 'express';
import { StoreProps } from 'client/core/store';
import { matchPath } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTopicByIdThunk, getTopicsThunk } from './actions/forum.actions';

interface StoreMapProps {
    path: string
    fetchFn: Function
}

const storeMap: StoreMapProps[] = [
    {
        path: '/forum',
        fetchFn: getTopicsThunk,
    },
    {
        path: '/forum/topic/:slug',
        fetchFn: getTopicByIdThunk,
    },
];

export const prepareStoreForClient = async (
    dispatch: ThunkDispatch<StoreProps, void, AnyAction>,
    req: Request,
) => {
    let match;

    const currentRoute = storeMap.find((el) => {
        match = matchPath(req.url, {
            path: el.path,
            exact: true,
            strict: true,
        });

        return Boolean(match);
    });

    if (currentRoute) {
        await dispatch(currentRoute.fetchFn(match));
    }
};

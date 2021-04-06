import {
    ForumAPI,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';

// TODO: будет доработано в LP-110
export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => () => {
    ForumAPI.getAll().then(async (response) => {
        console.log(response);
    }).catch(console.error);
};

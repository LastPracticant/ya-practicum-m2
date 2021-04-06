import {
    ForumAPI,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TopicModelProps } from 'server/models/models.types';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_TOPICS = 'SET_TOPICS';
export const SET_COMMENTS = 'SET_COMMENTS';

export const setTopicsAction = (payload: TopicModelProps[]) => ({
    type: SET_TOPICS,
    payload,
});

// TODO: будет доработано в LP-110, также необходимо сделать предзапрос данных на бэке для SSR
export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.getAllTopics().then((topics) => {
        dispatch(
            setTopicsAction(topics),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

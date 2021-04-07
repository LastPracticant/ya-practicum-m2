import {
    ForumAPI,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreForumProps, StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_TOPICS = 'SET_TOPICS';
export const SET_COMMENTS = 'SET_COMMENTS';

export const setTopicsAction = (payload: StoreForumProps) => ({
    type: SET_TOPICS,
    payload,
});

export const setCommentsAction = (payload: StoreForumProps) => ({
    type: SET_COMMENTS,
    payload,
});

// TODO: необходимо сделать предзапрос данных на бэке для SSR
export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.getAllTopics().then((topics) => {
        dispatch(
            setTopicsAction({ topics }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

// TODO: необходимо сделать предзапрос данных на бэке для SSR
export const getCommentsThunk = (topicId: number): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.getAllComments({ topicId }).then((comments) => {
        dispatch(
            setCommentsAction({ comments }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

// TODO: делаем тут экшены для добавления топика и комментария

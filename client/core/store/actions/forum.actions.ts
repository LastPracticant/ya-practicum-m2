import {
    AddCommentRequestProps,
    AddTopicRequestProps,
    ForumAPI,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreForumProps, StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_TOPICS = 'SET_TOPICS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';

export const setTopicsAction = (payload: StoreForumProps) => ({
    type: SET_TOPICS,
    payload,
});

export const setCurrentTopicAction = (payload: StoreForumProps) => ({
    type: SET_CURRENT_TOPIC,
    payload,
});

export const setCommentsAction = (payload: StoreForumProps) => ({
    type: SET_COMMENTS,
    payload,
});

// TODO: сделать предзапрос данных на бэке для SSR, если время останется
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

export const getTopicByIdThunk = (topicId: number): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.getTopicById({ topicId }).then((currentTopic) => {
        dispatch(
            setCurrentTopicAction({ currentTopic }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

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

export const addTopicThunk = (
    data: AddTopicRequestProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.addTopic(data)
        .then(() => {
            dispatch(getTopicsThunk());
        })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const addCommentThunk = (
    data: AddCommentRequestProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    ForumAPI.addComment(data)
        .then(() => {
            dispatch(getCommentsThunk(data.topicId));
        })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

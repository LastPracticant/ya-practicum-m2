import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { match as MatchProps } from 'react-router';
import {
    setCommentsAction,
    setCurrentTopicAction,
    setTopicsAction,
    StoreProps,
} from 'client/core/store';
import {
    fetchTopicById,
    fetchTopicComments,
    fetchTopics,
} from 'server/controllers/controllers.utils';

export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
    dispatch,
) => {
    await fetchTopics().then((response) => {
        const topics = response.map((el) => el.get({ plain: true }));

        dispatch(
            setTopicsAction({ topics }),
        );
    }).catch(console.error);
};

export const getTopicByIdThunk = (match: MatchProps<{ slug: string }>): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
    dispatch,
) => {
    await fetchTopicById(match.params.slug).then((currentTopic) => {
        if (!currentTopic) return;

        dispatch(
            setCurrentTopicAction({ currentTopic }),
        );
    }).catch(console.error);

    await fetchTopicComments(match.params.slug).then((response) => {
        const comments = response.map((el) => el.get({ plain: true }));

        dispatch(
            setCommentsAction({ comments }),
        );
    }).catch(console.error);
};

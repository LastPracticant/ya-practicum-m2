import { TopicModelProps } from 'server/models/models.types';
import { SET_TOPICS } from '../actions';
import { ActionProps } from '../actions/actions.types';
import { StoreForumProps } from '../store.types';

const initialStateProfile = {
    topics: [],
    comments: [],
} as StoreForumProps;

export const forumReducers = (
    state: StoreForumProps = initialStateProfile,
    action: Required<ActionProps<TopicModelProps[]>>,
) => {
    switch (action.type) {
    case SET_TOPICS:
        return {
            ...state,
            topics: action.payload,
        };
    default:
        return state;
    }
};

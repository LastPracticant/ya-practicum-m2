import { SET_COMMENTS, SET_CURRENT_TOPIC, SET_TOPICS } from '../actions';
import { ActionProps } from '../actions/actions.types';
import { StoreForumProps } from '../store.types';

const initialStateProfile = {} as StoreForumProps;

export const forumReducers = (
    state: StoreForumProps = initialStateProfile,
    action: Required<ActionProps<StoreForumProps>>,
) => {
    switch (action.type) {
    case SET_TOPICS:
        return {
            ...state,
            topics: action.payload.topics,
        };
    case SET_CURRENT_TOPIC:
        return {
            ...state,
            currentTopic: action.payload.currentTopic,
        };
    case SET_COMMENTS:
        return {
            ...state,
            comments: action.payload.comments,
        };
    default:
        return state;
    }
};

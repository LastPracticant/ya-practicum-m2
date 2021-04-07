import { SET_COMMENTS, SET_TOPICS } from '../actions';
import { ActionProps } from '../actions/actions.types';
import { StoreForumProps } from '../store.types';

const initialStateProfile = {
    topics: [],
    comments: [],
} as StoreForumProps;

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
    case SET_COMMENTS:
        return {
            ...state,
            comments: action.payload.comments,
        };
    default:
        return state;
    }
};

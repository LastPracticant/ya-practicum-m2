import { ActionProps } from '../actions/actions.types';
import { GAME_OVER } from '../actions/game.actions';
import { StoreGameProps } from '../store.types';

const initialState: StoreGameProps = {
    isOver: false,
    score: 0,
};

export const gameReducers = (state = initialState, action: ActionProps<StoreGameProps>) => {
    switch (action.type) {
    case GAME_OVER: {
        return {
            ...state,
            ...action.payload,
        };
    }
    default:
        return state;
    }
};

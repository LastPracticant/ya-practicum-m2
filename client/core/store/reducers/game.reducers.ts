import { GAME_OPTIONS } from 'client/core/components/GameCanvas/GameCanvas.config';
import { ActionProps } from '../actions/actions.types';
import {
    GAME_NEXT_LEVEL,
    GAME_OVER,
    GAME_PAUSE,
    GAME_RESET,
} from '../actions/game.actions';
import { StoreGameProps } from '../store.types';

const initialState: Required<StoreGameProps> = {
    isOver: false,
    isPause: false,
    score: 0,
    currentLevel: 0,
};

export const gameReducers = (state = initialState, action: ActionProps<StoreGameProps>) => {
    const actionScore = action.payload?.score || 0;
    const score = state.score + actionScore;

    switch (action.type) {
    case GAME_OVER: {
        return {
            ...state,
            score,
            isOver: action.payload?.isOver,
            currentLevel: 0,
        };
    }
    case GAME_PAUSE: {
        return {
            ...state,
            score,
            isPause: action.payload?.isPause,
        };
    }
    case GAME_NEXT_LEVEL: {
        return {
            ...state,
            score,
            isPause: action.payload?.isPause,
            currentLevel: state.currentLevel === GAME_OPTIONS.levels.options.length - 1
                ? 0
                : state.currentLevel + 1,
        };
    }
    case GAME_RESET: {
        return initialState;
    }
    default:
        return state;
    }
};

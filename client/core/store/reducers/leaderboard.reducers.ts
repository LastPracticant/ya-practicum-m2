import { ActionProps } from '../actions/actions.types';
import { SET_CURRENT_PLAYER_SCORE, SET_PLAYERS_SCORES } from '../actions/leaderboard.actions';
import { LeaderboardProps } from '../store.types';

const initialState = {} as LeaderboardProps;

export const leaderboardReducers = (state = initialState, action: Required<ActionProps<LeaderboardProps>>) => {
    switch (action.type) {
    case SET_PLAYERS_SCORES: {
        return {
            ...state,
            playersScores: action.payload.playersScores,
        };
    }

    case SET_CURRENT_PLAYER_SCORE: {
        return {
            ...state,
            currentPlayerScore: action.payload.currentPlayerScore,
        };
    }

    default:
        return state;
    }
};

import { AddResultRequestProps, LeaderboardAPI } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardProps, StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_PLAYERS_SCORES = 'SET_PLAYERS_SCORES';
export const SET_CURRENT_PLAYER_SCORE = 'SET_CURRENT_PLAYER_SCORE';

export const setPlayersScoresAction = (payload: LeaderboardProps) => ({
    type: SET_PLAYERS_SCORES,
    payload,
});

export const setCurrentPlayerScoreAction = (payload: LeaderboardProps) => ({
    type: SET_CURRENT_PLAYER_SCORE,
    payload,
});

export const getPlayersScoresThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    LeaderboardAPI.getPlayersScores().then((playersScores) => {
        dispatch(
            setPlayersScoresAction({ playersScores }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const getScoreByPlayerIdThunk = (playerId: number): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    LeaderboardAPI.getScoreByPlayerId(playerId).then((currentPlayerScore) => {
        dispatch(
            setCurrentPlayerScoreAction({ currentPlayerScore }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const addResultToLeaderboardThunk = (data: AddResultRequestProps): ThunkAction<void, StoreProps, unknown, Action<string>> => () => {
    LeaderboardAPI.addPlayerScore(data);
};

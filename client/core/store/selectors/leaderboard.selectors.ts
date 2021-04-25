import { StoreProps } from '../store.types';

export const playersScoresSelector = (store: StoreProps) => store.leaderboard.playersScores;
export const currentPlayerScoreSelector = (store: StoreProps) => store.leaderboard.currentPlayerScore;

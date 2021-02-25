import { StoreGameProps } from '../store.types';

export const GAME_OVER = 'GAME_OVER';

export const gameOverAction = (payload: StoreGameProps) => ({
    type: GAME_OVER,
    payload,
});

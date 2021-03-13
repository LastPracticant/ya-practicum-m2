import { StoreProps } from 'client/core/store';

export const defaultState = {
    loader: false,
    profile: {},
    game: {
        isOver: false,
        isPause: false,
        score: 0,
        currentLevel: 0,
    },
    snackbar: {
        isVisible: false,
        msg: '',
        type: 'info',
    },
    // TODO: пока true, будет поправлено в LP-86
    auth: true,
} as StoreProps;

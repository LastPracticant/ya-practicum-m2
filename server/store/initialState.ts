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
    // TODO: можно поставить true, чтобы проверить работоспособность рендера, будет доработано в LP-86
    auth: false,
} as StoreProps;

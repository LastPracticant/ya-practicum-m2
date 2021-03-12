import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loaderReducers, profileReducers, authReducers } from './reducers';
import { gameReducers } from './reducers/game.reducers';
import { snackbarReducers } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';

const middlewares = [thunk];

export const rootReducer = combineReducers<StoreProps>({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    snackbar: snackbarReducers,
    auth: authReducers,
});

const defaultState = {
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
    auth: null,
} as StoreProps;

export const composeStore = (initialState: StoreProps = defaultState) => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

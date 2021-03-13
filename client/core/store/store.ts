import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loaderReducers, profileReducers, authReducers } from './reducers';
import { gameReducers } from './reducers/game.reducers';
import { snackbarReducers } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';

const middlewares = [thunk];

export const isServer = !(
    typeof window !== 'undefined'
    && window.document
    && window.document.createElement
);

export const rootReducer = combineReducers<StoreProps>({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    snackbar: snackbarReducers,
    auth: authReducers,
});

export const composeStore = (initialState: StoreProps) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
);

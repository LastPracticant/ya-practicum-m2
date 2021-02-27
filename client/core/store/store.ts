import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    loaderReducers, profileReducers, authReducers, initialStateProfile,
} from './reducers';
import { gameReducers, initialStateGame } from './reducers/game.reducers';
import { snackbarReducers, initialStateSnackBar } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';

const middlewares = [thunk];

const rootReducer = combineReducers({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    auth: authReducers,
    snackbar: snackbarReducers,
});

function saveToLocalStorage(state: StoreProps) {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('state', serialisedState);
}

function loadFromLocalStorage() {
    const storageStore = localStorage.getItem('state');
    let state: StoreProps = {
        auth: false,
        game: initialStateGame,
        loader: false,
        snackbar: initialStateSnackBar,
        profile: initialStateProfile,
    };
    if (storageStore) {
        state = JSON.parse(storageStore) as StoreProps;
    }
    return state;
}

export const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(...middlewares)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

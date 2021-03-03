import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    loaderReducers, profileReducers, authReducers,
} from './reducers';
import { gameReducers } from './reducers/game.reducers';
import { snackbarReducers } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';

const middlewares = [thunk];

const rootReducer = combineReducers({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    auth: authReducers,
    snackbar: snackbarReducers,
});

const saveToLocalStorage = (state: StoreProps) => {
    const { auth, profile } = state;
    const serialisedProfile = JSON.stringify(profile);
    localStorage.setItem('profile', serialisedProfile);

    const serialisedAuth = JSON.stringify(auth);
    localStorage.setItem('auth', serialisedAuth);
};

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

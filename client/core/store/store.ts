import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    loaderReducers, profileReducers, authReducers, initialStateProfile,
} from './reducers';
import { gameReducers, initialStateGame } from './reducers/game.reducers';
import { snackbarReducers, initialStateSnackBar } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';
import { CurrentUserInfoProps } from '../api';

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

const loadFromLocalStorage = (): StoreProps => {
    const profile = localStorage.getItem('profile');
    const auth = localStorage.getItem('auth');
    const state: StoreProps = {
        auth: false,
        game: initialStateGame,
        loader: false,
        snackbar: initialStateSnackBar,
        profile: initialStateProfile,
    };
    if (profile) {
        const serialisedProfile = JSON.parse(profile) as CurrentUserInfoProps;
        state.profile = serialisedProfile;
    }
    if (auth) {
        const serialisedAuth = Boolean(JSON.parse(auth));
        state.auth = serialisedAuth;
    }
    return state;
};

export const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(...middlewares)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

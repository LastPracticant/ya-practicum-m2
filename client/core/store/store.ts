import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    loaderReducers,
    profileReducers,
    authReducers,
    oauthReducers,
    forumReducers,
    leaderboardReducers,
    settingsReducers,
} from './reducers';
import { gameReducers } from './reducers/game.reducers';
import { snackbarReducers } from './reducers/snackbar.reducers';
import { StoreProps } from './store.types';

export const isServer = !(
    typeof window !== 'undefined'
    && window.document
    && window.document.createElement
);

export const history = !isServer
    ? createBrowserHistory()
    : createMemoryHistory();

const middlewares = [
    thunk,
    routerMiddleware(history),
];

const historyReducer = connectRouter(history);

export const rootReducer = combineReducers<StoreProps>({
    router: historyReducer,
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    snackbar: snackbarReducers,
    auth: authReducers,
    oauth: oauthReducers,
    forum: forumReducers,
    leaderboard: leaderboardReducers,
    userSettings: settingsReducers,
});

export const composeStore = (initialState: StoreProps) => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

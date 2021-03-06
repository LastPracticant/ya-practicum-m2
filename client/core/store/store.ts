import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loaderReducers, profileReducers, authReducers } from './reducers';
import { gameReducers } from './reducers/game.reducers';
import { snackbarReducers } from './reducers/snackbar.reducers';

const middlewares = [thunk];

export const rootReducer = combineReducers({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
    auth: authReducers,
    snackbar: snackbarReducers,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

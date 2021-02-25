import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { gameReducers } from './reducers/game.reducers';
import { loaderReducers } from './reducers/loader.reducers';

const middlewares = [thunk];

const rootReducer = combineReducers({
    loader: loaderReducers,
    game: gameReducers,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

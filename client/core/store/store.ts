import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loaderReducers } from './reducers/loader.reducers';

const middlewares = [thunk];

const rootReducer = combineReducers(
    { loader: loaderReducers },
);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

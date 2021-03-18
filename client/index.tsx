import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { App } from './App';
import { composeStore } from './core/store';

const store = composeStore(window.__INITIAL_STATE__);

// TODO: на время интеграции SSR, после нужно будет убрать
// @ts-ignore
window.store = store;

export const AppWithHot = hot(App);

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <AppWithHot />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root'),
);

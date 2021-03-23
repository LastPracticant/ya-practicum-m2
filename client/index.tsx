import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { App } from './App';
import { composeStore } from './core/store';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const store = composeStore(window.__INITIAL_STATE__);

// TODO: на время интеграции SSR, после нужно будет убрать
// @ts-ignore
window.store = store;

const RootComponent = () => (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>
);

const RootComponentWithHot = hot(RootComponent);

ReactDOM.hydrate(
    <RootComponentWithHot />,
    document.getElementById('root'),
);

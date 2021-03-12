import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from './App';
import { composeStore } from './core/store';

const store = composeStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root'),
);

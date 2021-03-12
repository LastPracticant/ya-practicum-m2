import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { composeStore } from './core/store';

const store = composeStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root'),
);

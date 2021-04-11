import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { App } from './App';
import { composeStore, history, rootReducer } from './core/store';
import { IS_DEV } from '../env';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const store = composeStore(window.__INITIAL_STATE__);

// TODO: на время интеграции SSR, после нужно будет убрать
// @ts-ignore
window.store = store;

const RootComponent = () => (
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </ReduxProvider>
);

const RootComponentWithHot = hot(RootComponent);

ReactDOM.hydrate(
    IS_DEV ? (<RootComponentWithHot />) : (<RootComponent />),
    document.getElementById('root'),
);

if (IS_DEV) {
    if ((module as any).hot) {
        (module as any).hot.accept('./core/store/store', () => {
            store.replaceReducer(rootReducer);
        });
    }
}

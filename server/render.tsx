import { composeStore, StoreProps } from 'client/core/store';
import { Loader } from 'client/shared/components';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { defaultState } from './initialState';

interface PageHtmlProps {
    html: string;
    state: StoreProps
    helmet: HelmetData;
}

function getPageHtml({ html, state, helmet }: PageHtmlProps) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            <link rel="stylesheet" href="./main.css" type="text/css">
        </head>

        <body>
            <div id="root">${html}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            <script src="./app.js"></script>
        </body>
        </html>
    `;
}

export const renderHtml = (reqUrl: string) => {
    const store = composeStore(defaultState);
    const state = store.getState();
    const context = {};

    const html = renderToString(
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={reqUrl}>
                <Loader isVisible />
            </StaticRouter>
        </ReduxProvider>,
    );

    const helmet = Helmet.rewind();

    return {
        html: getPageHtml({ html, state, helmet }),
    };
};

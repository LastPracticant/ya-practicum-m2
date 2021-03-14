import { App } from 'client/App';
import { composeStore, StoreProps } from 'client/core/store';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
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
    const staticMarkup = renderToStaticMarkup(
        <html lang="ru">
            <base href="/" />
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                {helmet.title.toString()}
                {helmet.meta.toString()}
                <link rel="icon" type="image/png" href="./idea.png" />
                <link rel="stylesheet" href="/main.css" type="text/css" />
            </head>

            <body>
                <div id="root">${html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(state)}
                </script>
                <script src="/app.js" />
            </body>
        </html>,
    );

    return `<!DOCTYPE html> ${staticMarkup}`;
}

export const renderHtml = (reqUrl: string) => {
    const store = composeStore(defaultState);
    const state = store.getState();
    const context = {};

    const html = renderToString(
        <ReduxProvider store={store}>
            <StaticRouter context={context} location={reqUrl}>
                <App />
            </StaticRouter>
        </ReduxProvider>,
    );

    const helmet = Helmet.rewind();

    return {
        html: getPageHtml({ html, state, helmet }),
    };
};

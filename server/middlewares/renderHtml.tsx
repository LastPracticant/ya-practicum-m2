import { App } from 'client/App';
import { StoreProps } from 'client/core/store';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Store } from 'redux';

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
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}
                <link rel="icon" type="image/png" href="./idea.png" />
                <link rel="stylesheet" href="/main.css" type="text/css" />
            </head>

            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`,
                    }}
                />
                <script src="/app.js" />
                <script src="/start-sw.js" />
            </body>
        </html>,
    );

    return `<!DOCTYPE html> ${staticMarkup}`;
}

export const renderHtml = (reqUrl: string, state: StoreProps, store: Store) => {
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

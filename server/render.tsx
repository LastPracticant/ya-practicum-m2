import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';

interface PageHtmlParams {
    bundleHtml: string;
    helmet: HelmetData;
}

function getPageHtml({ bundleHtml, helmet }: PageHtmlParams) {
    const html = renderToStaticMarkup(
        <html lang="ru">
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}

                <link rel="icon" type="image/png" href="./idea.png" />
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }} />
            </body>
        </html>,
    );

    return `<!doctype html>${html}`;
}

function MockApp() {
    return <h1>Hello world!</h1>;
}

export const renderBundle = () => {
    const bundleHtml = renderToString(
        (
            <MockApp />
        ),
    );

    const helmet = Helmet.rewind();

    return {
        html: getPageHtml({ bundleHtml, helmet }),
    };
};

import { LOCAL } from 'client/shared/consts';
import { PageComponentProps } from 'client/shared/types';
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaProps extends Omit<PageComponentProps, 'className'> {
    description?: string
    'og:title'?: string
    'og:description'?: string
}

export const Meta: React.FC<MetaProps> = React.memo(
    (props) => (
        <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

            <title>
                {props.title
                    ? `${props.title} - ${LOCAL.GAME_NAME}`
                    : LOCAL.GAME_NAME}
            </title>

            {props.description && (
                <meta name="description" content={props.description} />
            )}
            {props['og:title'] && (
                <meta property="og:title" content={props['og:title']} />
            )}
            {props['og:description'] && (
                <meta property="og:description" content={props['og:description']} />
            )}
        </Helmet>
    ),
);

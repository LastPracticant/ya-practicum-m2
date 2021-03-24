import React, { FC, memo, useEffect } from 'react';
import './OAuth.css';

import { ComponentCommonProps } from 'client/shared/types';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { getOAuthUrl } from './OAuth.config';

const block = bem('oauth');

export const OAuth: FC<ComponentCommonProps> = memo(
    ({
        className,
    }) => {
        useEffect(() => {
            console.log('fetch oauth...');
        }, []);

        return (
            <div className={block({}).mix(className).toString()}>
                <a
                    href={getOAuthUrl(0)}
                >
                    {LOCAL.AUTHORIZE_YANDEX}
                </a>
            </div>
        );
    },
);

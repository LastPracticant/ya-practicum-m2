import React, {
    FC, memo, useEffect, useState,
} from 'react';
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
        const [clientId, setClientId] = useState<number>();

        useEffect(() => {
            fetch('https://ya-praktikum.tech/api/v2/oauth/yandex/service-id')
                .then(async (response) => {
                    const token = await response.json();
                    setClientId(token.service_id);
                })
                .catch(console.error);
        }, []);

        return (
            <div className={block({}).mix(className).toString()}>
                <a
                    href={getOAuthUrl(clientId)}
                >
                    {LOCAL.AUTHORIZE_YANDEX}
                </a>
            </div>
        );
    },
);

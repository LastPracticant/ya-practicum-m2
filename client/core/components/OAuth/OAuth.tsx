import React, {
    FC, memo, useEffect, MouseEvent,
} from 'react';
import './OAuth.css';

import { ComponentCommonProps } from 'client/shared/types';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { oauthSelector, getServiceIdThunk } from 'client/core/store';
import { getOAuthUrl } from './OAuth.config';

const block = bem('oauth');

export const OAuth: FC<ComponentCommonProps> = memo(
    ({
        className,
    }) => {
        const dispatch = useDispatch();
        const { oauth: clientId } = useSelector(oauthSelector);

        useEffect(() => {
            const url = getOAuthUrl(clientId);

            if (url) {
                window.location.href = url;
            }
        }, [clientId]);

        const fetchServiceId = (e: MouseEvent) => {
            e.preventDefault();
            dispatch(getServiceIdThunk());
        };

        return (
            <div className={block({}).mix(className).toString()}>
                <a
                    href="#s"
                    onClick={fetchServiceId}
                >
                    {LOCAL.AUTHORIZE_YANDEX}
                </a>
            </div>
        );
    },
);

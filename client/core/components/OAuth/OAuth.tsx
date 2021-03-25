import React, {
    FC, memo, useEffect,
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
            dispatch(getServiceIdThunk());
        }, [dispatch]);

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

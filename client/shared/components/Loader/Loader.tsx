import React, { FC, memo } from 'react';
import './Loader.css';

import { ComponentCommonProps } from 'client/shared/types';
import bem from 'bem-cn';
import loader from './loader.gif';
import { NivelatorXY } from '../NivelatorXY';

interface LoaderProps extends ComponentCommonProps {
    isVisible: boolean
}

const block = bem('loader');

export const Loader: FC<LoaderProps> = memo(
    ({
        className,
        isVisible,
    }) => (
        <div className={block({ visible: isVisible }).mix(className)}>
            <NivelatorXY>
                <img src={loader} alt="loader" />
            </NivelatorXY>
        </div>
    ),
);

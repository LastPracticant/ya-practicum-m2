import { Grid } from '@material-ui/core';
import bem from 'bem-cn';
import { ComponentCommonProps } from 'client/shared/types';
import React, { FC, memo } from 'react';
import './NivelatorXY.css';

const block = bem('nivelator-xy');

export const NivelatorXY: FC<ComponentCommonProps> = memo(
    ({
        children,
        className,
    }) => (
        <Grid
            container
            className={block({}).mix(className).toString()}
            justify="center"
            alignItems="center"
        >
            {children}
        </Grid>
    ),
);

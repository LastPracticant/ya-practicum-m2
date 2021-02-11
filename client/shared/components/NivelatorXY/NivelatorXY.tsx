import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import { ComponentCommonProps } from 'client/shared/types';
import React, { FC, memo } from 'react';
import './NivelatorXY.css';

export const NivelatorXY: FC<ComponentCommonProps> = memo(
    ({
        children,
        className,
    }) => (
        <Grid
            container
            className={classnames(
                'nivelator-xy',
                className,
            )}
            justify="center"
            alignItems="center"
        >
            {children}
        </Grid>
    ),
);

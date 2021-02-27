import { Grid, Paper, IconButton } from '@material-ui/core';
import { ComponentCommonProps } from 'client/shared/types';
import React from 'react';
import KeyboardTabRoundedIcon from '@material-ui/icons/KeyboardTabRounded';

import './PageLayout.css';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';

interface PageLayoutProps extends ComponentCommonProps {
    goBackLink?: string
}

const block = bem('page-layout');

export const PageLayout: React.FC<PageLayoutProps> = React.memo(
    ({ children, className, goBackLink = ROUTES.HOME.path }) => (
        <Grid
            container
            className={block({})
                .mix(className)
                .toString()}
        >
            <Grid item xs={1}>
                <Paper className={block('aside').toString()}>
                    <IconButton
                        component={Link}
                        to={goBackLink}
                        className={block('go-back').toString()}
                    >
                        <KeyboardTabRoundedIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={11}>
                <Grid
                    container
                    className={block('main').toString()}
                    alignItems="center"
                    justify="center"
                >
                    {children}
                </Grid>
            </Grid>
        </Grid>
    ),
);

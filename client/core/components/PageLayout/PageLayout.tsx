import { Grid, Paper } from '@material-ui/core';
import classnames from 'classnames';
import { ComponentCommonProps } from 'client/shared/types';
import React from 'react';
import KeyboardTabRoundedIcon from '@material-ui/icons/KeyboardTabRounded';

import './PageLayout.css';
import { Link } from 'react-router-dom';
import { ROUTES } from 'client/routing';

interface PageLayoutProps extends ComponentCommonProps {
    goBackLink?: string
}

export const PageLayout: React.FC<PageLayoutProps> = React.memo(({
    children,
    className,
    goBackLink = ROUTES.HOME.path,
}) => (
        <Grid
            container
            className={classnames(
                'page-layout',
                className,
            )}
        >
            <Grid item xs={1}>
                <Paper className="page-layout__aside">
                    <Link
                        to={goBackLink}
                        className="page-layout__go-back"
                    >
                        <KeyboardTabRoundedIcon />
                    </Link>
                </Paper>
            </Grid>

            <Grid item xs={11}>
                <Grid
                    container
                    className="page-layout__main"
                    alignItems="center"
                    justify="center"
                >
                    {children}
                </Grid>
            </Grid>
        </Grid>
));

import React from 'react';
import { PageComponentProps } from 'client/shared/types';

import './Landing.css';
import { Paper } from 'client/shared/components';
import { Grid } from '@material-ui/core';
import { Navigation } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';

const LandingComponent: React.FC<PageComponentProps> = React.memo(() => (
    <Grid container justify="center" alignItems="center">
        <Paper sizes="small">
            <Navigation />
        </Paper>
    </Grid>
));

export const Landing = withCheckAuth(LandingComponent);

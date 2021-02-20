import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Paper } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ProfileForm } from './components';
import { ProfilePassword } from './components/ProfilePassword/ProfilePassword';

export const Profile: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <Grid className="home" container justify="center" alignItems="center">
        <Paper sizes="small" className="auth-formbox">
            <h1 className="auth-header">{title}</h1>
            <Switch>
                <Route exact path="/profile">
                    <ProfileForm />
                </Route>
                <Route path="/profile/password">
                    <ProfilePassword />
                </Route>
            </Switch>
        </Paper>
    </Grid>
));

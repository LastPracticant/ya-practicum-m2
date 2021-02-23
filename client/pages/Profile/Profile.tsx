import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paper, NivelatorXY } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES } from 'client/routing';
import { ProfileForm } from './components';
import { ProfilePassword } from './components/ProfilePassword';

export const Profile: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <NivelatorXY className="home">
        <Paper sizes="small">
            <h1 className="auth-header">{title}</h1>
            <Switch>
                <Route path={ROUTES.PROFILE_PASSWORD.path}>
                    <ProfilePassword />
                </Route>
                <Route path={ROUTES.PROFILE.path}>
                    <ProfileForm />
                </Route>
            </Switch>
        </Paper>
    </NivelatorXY>
));

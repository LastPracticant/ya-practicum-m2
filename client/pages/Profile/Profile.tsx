import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Paper, NivelatorXY } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES } from 'client/routing';
import { ProfileForm, ProfileEdit, ProfileEditPassword } from './components';

export const Profile: React.FC<PageComponentProps> = React.memo(({ title }) => (
    <NivelatorXY className="home">
        <Paper sizes="small">
            <h1 className="auth-header">{title}</h1>
            <Switch>
                <Route path={ROUTES.PROFILE_PASSWORD.path}>
                    <ProfileEditPassword />
                </Route>
                <Route path={ROUTES.PROFILE_DATA.path}>
                    <ProfileEdit />
                </Route>
                <Route path={ROUTES.PROFILE.path}>
                    <ProfileForm />
                </Route>
            </Switch>
        </Paper>
    </NivelatorXY>
));

import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Paper } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES } from 'client/routing';
import { PageLayout } from 'client/core';
import { HOKAuth } from 'client/core/HOKs';
import { ProfileForm, ProfileEdit, ProfileEditPassword } from './components';

const ProfileComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const { pathname } = useLocation();
    let goBackLink = ROUTES.PROFILE.path;

    if (pathname === ROUTES.PROFILE.path) {
        goBackLink = ROUTES.HOME.path;
    }
    return (
        <PageLayout goBackLink={goBackLink}>
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
        </PageLayout>
    );
});

export const Profile = HOKAuth(ProfileComponent);

import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { NivelatorXY, Paper } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES } from 'client/routing';
import { Logo, Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';
import { ProfileForm, ProfileEdit, ProfileEditPassword } from './components';

const ProfileComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const isProfile = useRouteMatch({ path: ROUTES.PROFILE.path, strict: true });

    const goBackLink = isProfile?.isExact
        ? ROUTES.HOME.path
        : ROUTES.PROFILE.path;

    return (
        <PageLayout goBackLink={goBackLink}>
            <Meta title={title} />
            <NivelatorXY>
                <Logo />
                <Paper sizes="small">
                    <h1>{title}</h1>
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
        </PageLayout>
    );
});

export const Profile = withCheckAuth(ProfileComponent);

import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { NivelatorXY, Paper } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES } from 'client/routing';
import { Logo, Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';

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
                        <Route path={ROUTES.PROFILE.children?.PASSWORD.path} component={ROUTES.PROFILE.children?.PASSWORD.component} />
                        <Route path={ROUTES.PROFILE.children?.DATA.path} component={ROUTES.PROFILE.children?.DATA.component} />
                        <Route path={ROUTES.PROFILE.path} component={ROUTES.PROFILE.component} />
                    </Switch>
                </Paper>
            </NivelatorXY>
        </PageLayout>
    );
});

export const Profile = withCheckAuth(ProfileComponent);

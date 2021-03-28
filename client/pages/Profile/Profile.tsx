import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { NivelatorXY, Paper } from 'client/shared/components';
import { PageComponentProps } from 'client/shared/types';
import { ROUTES, Routing } from 'client/routing';
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

                    <Routing routes={ROUTES.PROFILE.children} />
                </Paper>
            </NivelatorXY>
        </PageLayout>
    );
});

export const Profile = withCheckAuth(ProfileComponent);

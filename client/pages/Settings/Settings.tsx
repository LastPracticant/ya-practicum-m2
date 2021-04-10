import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Meta, PageLayout } from 'client/core';
import { withCheckAuth } from 'client/core/HOCs';

const SettingsComponent: React.FC<PageComponentProps> = ({ title }) => (
    <PageLayout goBackLink={ROUTES.HOME.path}>
        <Meta title={title} />
        <Paper title={title}>
            Settings....
        </Paper>
    </PageLayout>
);

export const Settings = withCheckAuth(SettingsComponent);

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { PageLayout } from 'client/core';
import { DataGrid } from '@material-ui/data-grid';
import { rows } from './Leaderboard.mock';
import { columns } from './Leaderboard.config';

export const Leaderboard: React.FC<PageComponentProps> = ({ title }) => (
    <PageLayout goBackLink={ROUTES.HOME.path}>
        <Paper title={title}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                disableColumnMenu
                disableColumnReorder
            />
        </Paper>
    </PageLayout>
);

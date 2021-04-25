import React, { useEffect } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Meta, PageLayout } from 'client/core';
import { DataGrid } from '@material-ui/data-grid';
import { withCheckAuth } from 'client/core/HOCs';
import { getPlayersScoresThunk, playersScoresSelector } from 'client/core/store';
import { useDispatch, useSelector } from 'react-redux';
import { columns } from './Leaderboard.config';

const LeaderboardComponent: React.FC<PageComponentProps> = ({ title }) => {
    const playersScores = useSelector(playersScoresSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayersScoresThunk());
    }, []);

    return (
    <PageLayout goBackLink={ROUTES.HOME.path}>
        <Meta title={title} />
        <Paper title={title}>
            <DataGrid
                rows={playersScores || []}
                columns={columns}
                autoHeight
                disableColumnMenu
                disableColumnReorder
                hideFooterPagination
            />
        </Paper>
    </PageLayout>
    );
};

export const Leaderboard = withCheckAuth(LeaderboardComponent);

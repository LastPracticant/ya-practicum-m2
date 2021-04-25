import React from 'react';
import { Columns } from '@material-ui/data-grid';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { UserInfoProps } from 'client/core/api';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'player',
        headerName: LOCAL.LEADERBOARD_COLUMN_PLAYER,
        flex: 1,
        sortable: false,
        renderCell: (params) => {
            const { name } = params.getValue('user') as UserInfoProps;

            return <>{name}</>;
        },
    },
    {
        field: 'score',
        headerName: LOCAL.LEADERBOARD_COLUMN_SCORE,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
];

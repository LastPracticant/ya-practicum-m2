import React from 'react';
import { Columns } from '@material-ui/data-grid';
import { Link as RouterLink } from 'react-router-dom';
import bem from 'bem-cn';
import { ROUTES } from 'client/routing';
import { LOCAL } from 'client/shared/consts';
import { formatDate } from 'client/shared/utils';
import { UserInfoProps } from 'client/core/api';
import { Link } from '@material-ui/core';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'name',
        headerName: LOCAL.FORUM_COLUMN_TOPIC,
        flex: 1,
        sortable: false,
        renderCell: (params) => (
            <Link
                component={RouterLink}
                to={`${ROUTES.FORUM.children?.TOPIC.path}/${params.getValue('id')}`}
                className={block('topic-link')}
                color="error"
            >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'updatedAt',
        headerName: LOCAL.DATE_UPDATE,
        width: 200,
        sortable: false,
        renderCell: (params) => <>{formatDate(params.value as Date)}</>,
    },
    {
        field: 'createdAt',
        headerName: LOCAL.DATE_CREATE,
        width: 200,
        sortable: false,
        renderCell: (params) => <>{formatDate(params.value as Date)}</>,
    },
    {
        field: 'userId',
        headerName: LOCAL.FORUM_COLUMN_AUTOR,
        width: 200,
        sortable: false,
        renderCell: (params) => {
            const { name } = params.getValue('user') as UserInfoProps;

            return <>{name}</>;
        },
    },
];

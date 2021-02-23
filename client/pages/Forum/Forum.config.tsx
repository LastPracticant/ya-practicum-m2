import React from 'react';
import { CellParams, Columns } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import bem from 'bem-cn';
import { ROUTES } from 'client/routing';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'topic',
        headerName: 'Тема',
        flex: 1,
        sortable: false,
        renderCell: (params: CellParams) => (
            <Link to={`${ROUTES.FORUM_TOPIC.path}/${params.getValue('id')}`} className={block('topic-link')}>
                {params.value}
            </Link>
        ),
    },
    {
        field: 'reviews',
        headerName: 'Просмотры',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'answers',
        headerName: 'Ответы',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'autor',
        headerName: 'Автор',
        width: 200,
        sortable: false,
    },
];

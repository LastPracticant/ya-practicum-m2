import React from 'react';
import { CellParams, Columns } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import bem from 'bem-cn';
import { ROUTES } from 'client/routing';
import { LOCAL } from 'client/shared/consts';

export const block = bem('forum');

// TODO: вернуть колонку reviews, если останется время (необходимо сделать соответствующие методы на бэке и инфр-ру в БД)
export const columns: Columns = [
    {
        field: 'topic',
        headerName: LOCAL.FORUM_COLUMN_TOPIC,
        flex: 1,
        sortable: false,
        renderCell: (params: CellParams) => (
            <Link to={`${ROUTES.FORUM.children?.TOPIC.path}/${params.getValue('id')}`} className={block('topic-link')}>
                {params.value}
            </Link>
        ),
    },
    {
        field: 'answers',
        headerName: LOCAL.FORUM_COLUMN_ANSWERS,
        width: 150,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'autor',
        headerName: LOCAL.FORUM_COLUMN_AUTOR,
        width: 200,
        sortable: false,
    },
];
